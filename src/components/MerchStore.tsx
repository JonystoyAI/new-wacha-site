import React, { useState } from 'react';
import { MERCH_DATA } from '../data/merchData';
import { MerchItem, CartItem } from '../types';
import { ShoppingBag, Plus, Check, X, Flame, Trash2, ArrowRight } from 'lucide-react';

interface MerchStoreProps {
  cart: CartItem[];
  onAddToCart: (item: MerchItem, size: string) => void;
  onRemoveFromCart: (itemId: string, size: string) => void;
  onUpdateQuantity: (itemId: string, size: string, qty: number) => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
}

export const MerchStore: React.FC<MerchStoreProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateQuantity,
  isCartOpen,
  onCloseCart
}) => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({
    'tshirt-papuu': 'L',
    'cap-vhs': 'AJUSTABLE',
    'pack-stickers-holo': 'PACK 12 PZS',
    'poster-mask-camera': '50x70 CM',
    'desk-rack-wacha': 'ESTÁNDAR 19"'
  });

  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleAdd = (item: MerchItem) => {
    const size = selectedSizes[item.id] || (item.availableSizes ? item.availableSizes[0] : 'ÚNICA');
    onAddToCart(item, size);
    setAddedNotification(item.name);
    setTimeout(() => setAddedNotification(null), 2500);
  };

  const totalUsd = cart.reduce((acc, c) => acc + (c.item.priceUsd * c.quantity), 0);
  const totalMxn = cart.reduce((acc, c) => acc + (c.item.priceMxn * c.quantity), 0);

  // Generate WhatsApp Order String
  const generateWhatsAppLink = () => {
    if (cart.length === 0) return '#';
    const cartText = cart
      .map(c => `• ${c.quantity}x ${c.item.name} (Talla/Opción: ${c.selectedSize}) - $${c.item.priceUsd * c.quantity} USD / $${c.item.priceMxn * c.quantity} MXN`)
      .join('%0A');
    const message = `Hola%20Wacha%20Multimedia,%20quiero%20realizar%20el%20siguiente%20pedido%20de%20Merch:%0A%0A${cartText}%0A%0ATOTAL:%20$${totalUsd}%20USD%20/%20$${totalMxn}%20MXN%0A%0APor%20favor%20confírmame%20métodos%20de%20pago%20y%20envío.`;
    return `https://wa.me/524424655478?text=${message}`;
  };

  return (
    <section id="tienda" className="py-16 bg-[#FAF9F5] dark:bg-[#121411] border-b-2 border-black dark:border-zinc-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b-2 border-zinc-300 dark:border-zinc-800 pb-4 mb-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-black bg-black brutal-shadow-lime shrink-0 hidden sm:block">
              <img
                src="/wacha_logo.jpg"
                alt="Logo Oficial Wacha El tianguis"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-jetbrains text-xs text-[#B8006E] dark:text-[#D4FF00] font-bold tracking-wider mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#B8006E] dark:bg-[#D4FF00]"></span>
                // SECCIÓN 04: WACHA EL TIANGUIS // MERCH BOUTIQUE
              </div>
              <h2 className="font-anton text-4xl sm:text-5xl text-black dark:text-white uppercase tracking-wide flex items-center gap-3">
                WACHA EL TIANGUIS
                <span className="text-xs font-jetbrains px-3 py-1 bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black border border-black font-bold">
                  EDICIÓN LIMITADA
                </span>
              </h2>
            </div>
          </div>
          <p className="font-jetbrains text-xs text-zinc-700 dark:text-zinc-400 max-w-md">
            Ropa pesada, gorras con bordado 3D, stickers holográficos y mobiliario de estudio custom.
          </p>
        </div>

        {/* Added to Cart Notification Banner */}
        {addedNotification && (
          <div className="bg-[#D4FF00] text-black font-jetbrains text-xs font-bold p-3 border-2 border-black brutal-shadow-black mb-6 flex justify-between items-center animate-bounce">
            <span>✓ {addedNotification} AÑADIDO AL CARRITO</span>
            <span className="text-xs">¡PAPÚUU!</span>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MERCH_DATA.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-zinc-900 border-2 border-black dark:border-zinc-800 p-5 brutal-shadow-black hover:border-[#B8006E] dark:hover:border-[#D4FF00] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Product Image */}
                <div className="relative aspect-square bg-black border border-zinc-300 dark:border-zinc-800 overflow-hidden group-hover:border-[#B8006E] dark:group-hover:border-[#D4FF00] transition-colors">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-[#FF4400] text-white font-jetbrains text-[10px] font-bold px-2.5 py-1 border border-black">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-white dark:bg-black/90 text-black dark:text-[#D4FF00] font-jetbrains text-xs font-bold px-2.5 py-1 border-2 border-black dark:border-zinc-700 shadow-sm">
                    ${product.priceUsd} USD / ${product.priceMxn} MXN
                  </div>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[10px] font-jetbrains bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 px-2 py-0.5 border border-zinc-300 dark:border-zinc-700 inline-block mb-1 font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-anton text-xl text-black dark:text-white group-hover:text-[#B8006E] dark:group-hover:text-[#D4FF00] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="font-space-grotesk text-xs text-zinc-700 dark:text-zinc-400 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Size Selection Pill Bar */}
                {product.availableSizes && product.availableSizes.length > 1 && (
                  <div className="space-y-1.5 font-jetbrains text-xs">
                    <span className="text-zinc-700 dark:text-zinc-400 text-[10px] font-bold">SELECCIONAR TALLA:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`px-2.5 py-1 border-2 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 text-xs font-bold cursor-pointer ${
                            selectedSizes[product.id] === size
                              ? 'bg-black text-[#D4FF00] dark:bg-[#D4FF00] dark:text-black border-black brutal-shadow-black'
                              : 'bg-white dark:bg-zinc-800 text-black dark:text-zinc-200 border-black dark:border-zinc-700 hover:bg-[#D4FF00] hover:text-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Action */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4 font-jetbrains text-xs">
                <button
                  onClick={() => handleAdd(product)}
                  className="w-full bg-[#D4FF00] text-black hover:bg-[#D9008F] hover:text-white font-bold py-3 border-2 border-black transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 brutal-shadow-black group/btn cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-black group-hover/btn:text-white" />
                  <span className="text-black group-hover/btn:text-white font-bold">AÑADIR AL CARRITO (${product.priceUsd} USD)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Cart Side Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-[#121411] border-l-4 border-black h-full flex flex-col justify-between p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b-2 border-zinc-300 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#B8006E] dark:text-[#D4FF00]" />
                  <h3 className="font-anton text-2xl text-black dark:text-white">CARRITO WACHA DROP</h3>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-1 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-zinc-400 hover:text-white hover:bg-black border border-black dark:border-zinc-700 transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Item List */}
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3 font-jetbrains">
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm font-bold">TU CARRITO ESTÁ VACÍO // [ 0 ÍTEMS ]</p>
                  <p className="text-xs text-zinc-500">Selecciona algún producto de la boutique para realizar tu pedido.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((cartItem, idx) => (
                    <div
                      key={`${cartItem.item.id}-${cartItem.selectedSize}-${idx}`}
                      className="bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-800 p-3 flex gap-3 items-center justify-between font-jetbrains text-xs"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-14 h-14 object-cover border border-zinc-400 dark:border-zinc-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-bold text-black dark:text-white truncate">{cartItem.item.name}</h4>
                        <p className="text-[10px] text-[#B8006E] dark:text-[#D4FF00] font-semibold">
                          TALLA: {cartItem.selectedSize} | ${cartItem.item.priceUsd} USD c/u
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.selectedSize, cartItem.quantity - 1)}
                            className="w-5 h-5 bg-zinc-200 dark:bg-black border border-zinc-400 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className="text-black dark:text-white font-bold">{cartItem.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.selectedSize, cartItem.quantity + 1)}
                            className="w-5 h-5 bg-zinc-200 dark:bg-black border border-zinc-400 dark:border-zinc-700 text-black dark:text-white flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="font-bold text-black dark:text-white">${cartItem.item.priceUsd * cartItem.quantity} USD</p>
                        <button
                          onClick={() => onRemoveFromCart(cartItem.item.id, cartItem.selectedSize)}
                          className="text-red-600 dark:text-red-400 hover:underline text-[10px] flex items-center gap-1 justify-end font-bold"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>ELIMINAR</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Checkout */}
            {cart.length > 0 && (
              <div className="border-t-2 border-zinc-300 dark:border-zinc-800 pt-4 space-y-4 font-jetbrains text-xs">
                <div className="space-y-1 bg-zinc-100 dark:bg-black p-3 border-2 border-zinc-300 dark:border-zinc-800">
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-400">
                    <span>SUBTOTAL:</span>
                    <span>${totalUsd} USD / ${totalMxn} MXN</span>
                  </div>
                  <div className="flex justify-between text-zinc-700 dark:text-zinc-400">
                    <span>ENVÍO A TODO MÉXICO / INT:</span>
                    <span className="text-emerald-800 dark:text-emerald-400 font-bold">POR CALCULAR EN WA</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-black dark:text-white border-t border-zinc-300 dark:border-zinc-800 pt-2 mt-2">
                    <span>TOTAL ESTIMADO:</span>
                    <span className="text-[#B8006E] dark:text-[#D4FF00] font-mono font-bold">${totalUsd} USD (${totalMxn} MXN)</span>
                  </div>
                </div>

                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FF4400] text-white font-bold py-3.5 border-2 border-black brutal-shadow-black hover:bg-orange-600 transition-all duration-150 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Flame className="w-4 h-4" />
                  <span>ENVIAR PEDIDO POR WHATSAPP (+52 442 465 5478)</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
