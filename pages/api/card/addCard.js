import Card from '../../../models/Card'
import connectDB from '../../../middleware/middleware'
const handler = async (req, res) => {
  if (req.method == "POST") {
    const { userId,CardNo,UserName,BankName,ExpiryDate,CardType,} = req.body;
    let cardList = await Card.find({userId:userId});
    // console.log(addressList);
    if (cardList.length==0) {
        let card = new Card({
            userId: userId,
            CardNo: CardNo,
            UserName: UserName,
            BankName: BankName,
            ExpiryDate: ExpiryDate,
            CardType: CardType,
            isDefault: true});
        await card.save();
        res.status(200).json({ message: "Success" });
    } else {
        let card = new Card({
            userId: userId,
            CardNo: CardNo,
            UserName: UserName,
            BankName: BankName,
            ExpiryDate: ExpiryDate,
            CardType: CardType,
            isDefault:false});
        await card.save();
        res.status(200).json({ message: "Success" });
    }
  } else {
    res.status(400).json({ message: "Wrong Method" });
  }
}

export default connectDB(handler)