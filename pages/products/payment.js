import React from 'react'
import Navbar from '../../comps/Navbar'
import styles from '../../styles/product.module.css'
function payment() {
  return (
    <div>
      <Navbar color={"rgb(223 69 62)"} />
      <div className={styles.mainDiv}>
        <h1>Payment Page</h1>
        <div className={styles.formBody}>
          <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
            <input type="hidden" name="key_id" value="YOUR_KEY_ID" />
            <input type="shown" name="amount" value={1001} />
            <input type="hidden" name="order_id" value="razorpay_order_id" />
            <input type="hidden" name="name" value="Acme Corp" />
            <input type="hidden" name="description" value="A Wild Sheep Chase" />
            <input type="shown" name="image" value="https://cdn.razorpay.com/logos/BUVwvgaqVByGp2_large.jpg" />
            <input type="hidden" name="prefill[name]" value="Gaurav Kumar" />
            <input type="hidden" name="prefill[contact]" value="9123456780" />
            <input type="hidden" name="prefill[email]" value="gaurav.kumar@example.com" />
            <input type="hidden" name="notes[shipping address]" value="L-16, The Business Centre, 61 Wellfield Road, New Delhi - 110001" />
            <input type="hidden" name="callback_url" value="https://example.com/payment-callback" />
            <input type="hidden" name="cancel_url" value="https://example.com/payment-cancel" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default payment