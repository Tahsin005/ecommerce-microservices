export const orderConfirmedTemplate = ({ userName, orderId, totalPrice, items }) => {
    const itemRows = items.map(item => `
        <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        </tr>
    `).join('')

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Order Confirmed</h2>
            <p>Hi ${userName},</p>
            <p>Your order has been confirmed and is being processed.</p>

            <h3 style="color: #555;">Order #${orderId}</h3>

            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #f5f5f5;">
                        <th style="padding: 8px; text-align: left;">Product</th>
                        <th style="padding: 8px; text-align: center;">Qty</th>
                        <th style="padding: 8px; text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemRows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="padding: 8px; font-weight: bold;">Total</td>
                        <td style="padding: 8px; text-align: right; font-weight: bold;">$${totalPrice.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>

            <p style="color: #888; font-size: 12px; margin-top: 24px;">
                Thank you for your purchase.
            </p>
        </div>
    `
}