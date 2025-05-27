export async function syncCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const userToken = localStorage.getItem('token');
  
    if (!userToken || cart.length === 0) return;
  
    try {
      await fetch('/api/cart/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ cart }),
      });
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  }
  