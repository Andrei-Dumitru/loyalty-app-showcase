const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Business = mongoose.model('Business');

const router = express.Router();

router.post('/scan', async (req, res) => {
    const { action, userId, offerId, businessId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        if (action === 'scan_user') {
            const business = await Business.findById(businessId);
            if (!business) return res.status(404).send('Business not found');

            let businessPoints = user.businessPoints.find(p => p.businessId.toString() === businessId);
            if (!businessPoints) {
                businessPoints = { businessId: businessId, points: 100, multiplier: 1.0 };
                user.businessPoints.push(businessPoints);
            }

            businessPoints.points += 100 * businessPoints.multiplier;
            businessPoints.multiplier = parseFloat(Math.min(businessPoints.multiplier + 0.1, 2.0).toFixed(1));

            await user.save();
            return res.status(200).send('Points and multiplier updated');

        } else if (action === 'redeem_offer') {
            const business = await Business.findOne({ 'offers._id': offerId });
            if (!business) return res.status(404).send('Offer not found');

            const offer = business.offers.id(offerId);
            if (!offer) return res.status(404).send('Offer not found');

            let businessPoints = user.businessPoints.find(p => p.businessId.toString() === business._id.toString());
            if (!businessPoints) return res.status(400).send('No points for this location');

            if (businessPoints.points < offer.price) {
                return res.status(400).send('Not enough points');
            }

            businessPoints.points -= offer.price;

            await user.save();
            return res.status(200).send('Offer redeemed and points deducted');

        } else {
            return res.status(400).send('Invalid action');
        }

    } catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;
