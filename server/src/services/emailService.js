const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (email, order) => {
  const productsList = order.products
    .map(item => `• ${item.productId?.name || 'Product'} x${item.quantity}`)
    .join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for your order!</h2>
        <p>Your order has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
        </div>
        <h3>Products</h3>
        <pre style="background: #f9f9f9; padding: 15px; border-radius: 5px;">${productsList}</pre>
        <p>Thank you for shopping with Khurai Jewels!</p>
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

module.exports = { sendOrderConfirmation, sendContactEmail };
