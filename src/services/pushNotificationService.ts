/**
 * Wacha PWA Push Notification Service
 * Manages notification permissions, subscription status, and push event dispatchers
 * for new store drops and blog articles.
 */

const PUSH_SUBSCRIPTION_KEY = 'wacha_push_subscribed_v1';

export const isPushSupported = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
};

export const getPushSubscriptionStatus = (): boolean => {
  try {
    return localStorage.getItem(PUSH_SUBSCRIPTION_KEY) === 'true';
  } catch {
    return false;
  }
};

export async function requestPushPermission(): Promise<boolean> {
  if (!isPushSupported()) {
    alert('Las notificaciones Push no son compatibles con este navegador o dispositivo.');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, 'true');
      
      // Show confirmation push
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        reg.showNotification('¡Notificaciones Push Activadas!', {
          body: 'Ahora recibirás alertas instantáneas sobre nuevos drops en Wacha El Tianguis y artículos del Blog AEO.',
          icon: '/wacha_logo.jpg',
          badge: '/wacha_logo.jpg',
          tag: 'wacha-welcome'
        } as NotificationOptions);
      }
      return true;
    } else {
      localStorage.setItem(PUSH_SUBSCRIPTION_KEY, 'false');
      alert('Permiso de notificaciones denegado. Puedes habilitarlo en la configuración de tu navegador.');
      return false;
    }
  } catch (err) {
    console.error('Error requesting push permission:', err);
    return false;
  }
}

export async function sendLocalPushNotification(title: string, body: string, targetRoute = 'home'): Promise<void> {
  if (!isPushSupported()) return;

  const isSubscribed = getPushSubscriptionStatus();
  if (!isSubscribed) {
    // Prompt permission if not subscribed
    const granted = await requestPushPermission();
    if (!granted) return;
  }

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      await reg.showNotification(title, {
        body,
        icon: '/wacha_logo.jpg',
        badge: '/wacha_logo.jpg',
        data: { url: `/#${targetRoute}` },
        tag: `wacha-push-${Date.now()}`
      } as NotificationOptions);
    }
  } catch (err) {
    console.error('Error showing push notification:', err);
  }
}

export const triggerDropPush = async (itemName: string) => {
  await sendLocalPushNotification(
    '🔥 ¡NUEVO DROP EN WACHA EL TIANGUIS!',
    `¡Ya está disponible "${itemName}" en edición limitada! Consíguelo antes de que se agote.`,
    'tienda'
  );
};

export const triggerArticlePush = async (articleTitle: string) => {
  await sendLocalPushNotification(
    '📝 NUEVO ARTÍCULO PUBLICADO // BLOG AEO',
    `Lee la nueva investigación: "${articleTitle}". Optimizado para motores generativos 2026.`,
    'blog'
  );
};
