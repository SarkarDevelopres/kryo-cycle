import Card from '../../../models/Card'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  const { id, card } = req.body;
  // console.log(card.userId);
  if (req.method == "POST") {
    await Card.findOneAndUpdate({_id:id},{userId:card.userId,
        userId: card.userId,
        CardNo: card.CardNo,
        UserName: card.UserName,
        BankName: card.BankName,
        ExpiryDate: card.ExpiryDate,
        CardType: card.CardType,
        isDefault:card.isDefault});
    res.status(200).json({ message: "Success" });
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)