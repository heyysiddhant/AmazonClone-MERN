const express = require("express");
const cors = require("cors");

const sk = "sk_test_51J5EHJSEzMLO0wLKuzcB0cLS4gKs80nslkWNN4V4HjjF6twsxgTNxq4BBslOiVYnMuWIInhRRSkygTWrIrogyDU0000q3nsKNG";

const stripe = require("stripe")(sk);

const port = process.env.PORT || 8000

// app config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(express.json());
app.use( (req , res , next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*")
    res.setHeader("Access-Control-Allow-Headers"  , "*")
    next();
})

// api routes
app.get("/", (req, res) =>res.status(200).send("hello from firebase function"));


app.post("/payment/create", async (req, res) =>{
  const total = req.query.total;

  console.log("payment request received !!! ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({amount: total, currency: "INR"});
    // console.log("ppppppppppppp", paymentIntent.client_secret)
    // pi_3MGTHhSEzMLO0wLK1uBx89RG_secret_H3ViNLf0tWwMZ68fjZo9oGeWU

    res.status(201).send({status: `payment request received !!! ${total}`, clientSecret: paymentIntent.client_secret});
  } catch (e) {
    console.log("error - ", e.type, e.code);
    res.status(404).send({status: `payment failed !!! ${total}`});
  }
}
);


//listen
app.listen(port , () => console.log(`listening on http://127.0.0.1:${port}`))


//  http://127.0.0.1:8000
