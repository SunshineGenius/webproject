// src/lib/cart.ts

export interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  currency: string
  quantity: number
  imageUrl?: string
}

const STORAGE_KEY = 'cartItems'

// 简单事件机制
const listeners = new Set<() => void>()

export function subscribeCartChange(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notifyCartChange() {
  listeners.forEach((listener) => listener())
}

// 读取购物车
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

// 保存购物车
export function saveCartItems(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  notifyCartChange() // 通知更新
}

// 添加商品
export function addToCart(item: CartItem) {
  const existing = getCartItems()
  const index = existing.findIndex((i) => i.id === item.id)

  if (index > -1) {
    existing[index].quantity += item.quantity
  } else {
    existing.push(item)
  }

  saveCartItems(existing)
}

// 更新数量
export function updateCartItemQuantity(id: string, quantity: number) {
  const cart = getCartItems().map(item =>
    item.id === id ? { ...item, quantity } : item
  )
  saveCartItems(cart)
}

// 移除商品
export function removeFromCart(id: string) {
  const cart = getCartItems().filter(item => item.id !== id)
  saveCartItems(cart)
}

// 清空购物车
export function clearCart() {
  localStorage.removeItem(STORAGE_KEY)
  notifyCartChange() // 通知更新
}
