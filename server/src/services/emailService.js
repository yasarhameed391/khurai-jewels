const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const ADMIN_EMAIL = 'thasnihameed.0305@gmail.com';

const sendOrderConfirmation = async (email, order) => {
  const productsList = order.products
    .map(item => `• ${item.productId?.name || item.name || 'Product'} x${item.quantity}`)
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - Khurai Jewels #${order.orderNumber || order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #9b5a4a; border-radius: 8px; padding: 20px;">
        <h2 style="color: #9b5a4a; text-align: center;">Thank you for your order!</h2>
        <p style="text-align: center;">Your order has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #9b5a4a;">Order Details</h3>
          <p><strong>Order Number:</strong> ${order.orderNumber || order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Online'}</p>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount?.toLocaleString() || order.total?.toLocaleString()}</p>
        </div>
        <h3 style="color: #9b5a4a;">Products Ordered</h3>
        <pre style="background: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${productsList}</pre>
        <p style="text-align: center; color: #666; margin-top: 20px;">Thank you for shopping with <strong>Khurai Jewels</strong>!</p>
        <p style="text-align: center; color: #999; font-size: 12px;">Khurai Jewels, Kochi, Kerala | thasnihameed.0305@gmail.com</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

const sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <h3>Message</h3>
        <p>${message}</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact form notification sent');
  } catch (error) {
    console.error('Failed to send contact email:', error.message);
  }
};

const sendProductNotification = async (action, product, previousProduct = null) => {
  let htmlContent = '';
  const timestamp = new Date().toLocaleString();

  switch (action) {
    case 'created':
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px;">
          <h2 style="color: #D4AF37; text-align: center;">🆕 New Product Added</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Action:</strong> Product Created</p>
            <p><strong>Date:</strong> ${timestamp}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Product Name:</strong> ${product.name}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ₹${product.price?.toLocaleString()}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            ${product.description ? `<p><strong>Description:</strong> ${product.description}</p>` : ''}
          </div>
          <p style="text-align: center; color: #666; font-size: 12px;">Khurai Jewels Admin Notification</p>
        </div>
      `;
      break;
      
    case 'updated':
      const changes = [];
      if (previousProduct?.name !== product.name) changes.push(`Name: ${previousProduct?.name} → ${product.name}`);
      if (previousProduct?.price !== product.price) changes.push(`Price: ₹${previousProduct?.price} → ₹${product.price}`);
      if (previousProduct?.stock !== product.stock) changes.push(`Stock: ${previousProduct?.stock} → ${product.stock}`);
      if (previousProduct?.category !== product.category) changes.push(`Category: ${previousProduct?.category} → ${product.category}`);
      
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px;">
          <h2 style="color: #D4AF37; text-align: center;">✏️ Product Updated</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Action:</strong> Product Updated</p>
            <p><strong>Date:</strong> ${timestamp}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Product:</strong> ${product.name}</p>
            <p><strong>Product ID:</strong> ${product._id}</p>
            <h3 style="margin-top: 15px;">Changes Made:</h3>
            <ul style="background: #fff; padding: 15px; border-radius: 5px;">
              ${changes.map(change => `<li style="margin: 5px 0;">${change}</li>`).join('')}
            </ul>
          </div>
          <p style="text-align: center; color: #666; font-size: 12px;">Khurai Jewels Admin Notification</p>
        </div>
      `;
      break;
      
    case 'deleted':
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #D4AF37; border-radius: 8px; padding: 20px;">
          <h2 style="color: #D4AF37; text-align: center;">🗑️ Product Deleted</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Action:</strong> Product Deleted</p>
            <p><strong>Date:</strong> ${timestamp}</p>
            <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Deleted Product:</strong> ${previousProduct?.name || 'Unknown'}</p>
            <p><strong>Category:</strong> ${previousProduct?.category || 'N/A'}</p>
            <p><strong>Price:</strong> ₹${previousProduct?.price?.toLocaleString() || 0}</p>
            <p><strong>Stock:</strong> ${previousProduct?.stock || 0}</p>
          </div>
          <p style="text-align: center; color: #666; font-size: 12px;">Khurai Jewels Admin Notification</p>
        </div>
      `;
      break;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ADMIN_EMAIL,
    subject: `Product ${action.charAt(0).toUpperCase() + action.slice(1)} - Khurai Jewels`,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Product ${action} notification sent to admin`);
  } catch (error) {
    console.error(`Failed to send product ${action} notification:`, error.message);
  }
};

const sendOrderNotification = async ({ orderNumber, customerName, items, total, email }) => {
  const mailOptions = {
    from: EMAIL_USER,
    to: ADMIN_EMAIL,
    subject: `New Order Received - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37;">New Order Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Order Number</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${orderNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Customer Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${customerName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Items</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${items}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Amount</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹${total.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Customer Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${email || 'N/A'}</td>
          </tr>
        </table>
        <p style="color: #666;">Please process this order immediately.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order notification sent to admin for order ${orderNumber}`);
  } catch (error) {
    console.error('Failed to send order notification:', error.message);
  }
};

const sendStatusUpdate = async (email, order) => {
  const statusMessages = {
    confirmed: 'Your order has been confirmed and is being processed.',
    processing: 'Your order is being prepared for shipment.',
    shipped: 'Your order has been shipped and is on its way.',
    delivered: 'Your order has been delivered. Thank you for shopping with us!',
    cancelled: 'Your order has been cancelled.'
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Status Update - ${order.orderNumber || order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #9b5a4a;">Order Status Update</h2>
        <p>Your order status has been updated.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order ID:</strong> ${order.orderNumber || order._id}</p>
          <p><strong>Current Status:</strong> ${order.orderStatus}</p>
          <p><strong>Status Message:</strong> ${statusMessages[order.orderStatus] || ''}</p>
        </div>
        <p>Thank you for shopping with Khurai Jewels!</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Status update email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send status update email:', error.message);
  }
};

module.exports = { sendOrderConfirmation, sendContactEmail, sendProductNotification, sendOrderNotification, sendStatusUpdate };