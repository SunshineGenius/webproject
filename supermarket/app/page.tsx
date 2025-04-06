'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface CartItem extends Product {
    quantity: number;
}

const mockProducts: Product[] = [
    {
        id: '1',
        name: '新鲜苹果 Apple',
        price: 3.99,
        image: '/images/apple.jpg',
    },
    {
        id: '2',
        name: '有机牛奶 Milk',
        price: 5.49,
        image: '/images/milk.jpg',
    },
    {
        id: '3',
        name: '鸡蛋一打 Eggs',
        price: 2.99,
        image: '/images/eggs.jpg',
    },
];

const themes = {
    blue: { bg: 'bg-blue-200', accent: 'bg-blue-300' },
    pink: { bg: 'bg-pink-200', accent: 'bg-pink-300' },
    dark: { bg: 'bg-green-200', accent: 'bg-green-300' },
};

export default function HomePage() {
    const [theme, setTheme] = useState<keyof typeof themes>('blue');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const cartColors = {
        bg: 'bg-gray-100',
        accent: 'bg-gray-300',
        text: 'text-gray-700',
        hover: 'hover:bg-gray-200',
        border: 'border-gray-200'
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        setIsCartOpen(false);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!isMounted) return null;

    return (
        <main className="min-h-screen relative">
            {/* 购物车悬浮窗 */}
            <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
                <button
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className={`p-3 rounded-full shadow-lg ${cartColors.accent} hover:scale-105 transition-all relative`}
                >
                    🛒
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                            {totalItems}
                        </span>
                    )}
                </button>

                {isCartOpen && (
                    <div
                        className={`${cartColors.bg} p-4 rounded-lg shadow-xl w-80 max-h-[70vh] flex flex-col border ${cartColors.border}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`text-xl font-bold ${cartColors.text}`}>购物车 ({totalItems})</h3>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2">
                            {cart.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">您的购物车空空如也</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className={`flex justify-between items-center py-3 border-b ${cartColors.border}`}>
                                        <div className="flex items-center gap-3">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={48}
                                                height={48}
                                                className="rounded-lg object-cover border ${cartColors.border}"
                                            />
                                            <div>
                                                <p className={`font-medium ${cartColors.text}`}>{item.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {item.quantity} × ￥{item.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-500 hover:text-gray-700 px-2"
                                        >
                                            移除
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className={`pt-4 border-t ${cartColors.border} mt-4`}>
                                <div className={`flex justify-between font-bold mb-4 ${cartColors.text}`}>
                                    <span>总金额：</span>
                                    <span>￥{totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={clearCart}
                                        className={`flex-1 bg-gray-500 text-white py-2 rounded ${cartColors.hover}`}
                                    >
                                        清空购物车
                                    </button>
                                    <button
                                        className={`flex-1 bg-gray-600 text-white py-2 rounded ${cartColors.hover}`}
                                        onClick={() => alert('跳转到结算页面...')}
                                    >
                                        立即结算
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 顶部导航栏 */}
            <header className="bg-white shadow p-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/images/logo.jpg"
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h1 className="text-3xl italic font-bold text-green-600 tracking-wide animate-fade-in">
                            东方食品 <span className="font-light">DONG FANG FOOD</span>
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        {Object.keys(themes).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t as keyof typeof themes)}
                                className={`px-3 py-1 rounded transition-colors ${theme === t ? themes[t].accent : 'bg-gray-100'}`}
                            >
                                {t === 'blue' && '浅蓝'}
                                {t === 'pink' && '粉红'}
                                {t === 'dark' && '深绿'}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 商品列表 */}
            <div className={`${themes[theme].bg} p-6 min-h-screen transition-colors duration-300`}>
                <section className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                            🥦 欢迎来到我们的超市！
                        </h2>
                        <p className="text-gray-600 text-lg">
                            健康、新鲜、实惠，从这里开始您的购物之旅
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockProducts.map((product) => {
                            const inCart = cart.some(item => item.id === product.id);
                            const cartItem = cart.find(item => item.id === product.id);

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <Link href={`/products/${product.id}`} className="block">
                                        <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={400}
                                                height={400}
                                                className="object-cover w-full h-full hover:scale-105 transition-transform"
                                                priority
                                            />
                                        </div>
                                    </Link>

                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {product.name}
                                                </h3>
                                                <p className="text-green-600 font-bold mt-1">
                                                    ￥{product.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={inCart}
                                                className={`px-4 py-2 rounded-lg transition-colors ${inCart
                                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                                    }`}
                                            >
                                                {inCart ? `已添加${cartItem?.quantity || ''}` : '加入购物车'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <style jsx global>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </main>
    );
}
