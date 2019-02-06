/**
	*closeBidding
	*transcation

*/

async function closeBidding(closeBidding)
{

	const listing = closeBidding.listing;
	if(listing.state !== 'FOR_SALE')
	{
		throw new Error ('Listing is NOT FOR SALE');
	}

	//by default we mark listing as RESERVE_NOT_MET

	listing.state = 'RESERVE_NOT_MET';
	let highestoffer = null;
	let buyer = null;
	let seller = null;

	if(listing.offers && listing.offers.length > 0)
	{
		//sort bids by bidPrice
		listing.offers.sort(function(a,b){return (b.bidPrice - a.bidPrice);});
		highestoffer = Listing.offers[0];

		if(highestoffer.bidPrice >= listing.reservePrice)
		{
			//mark listing as SOLD
			listing.state = 'SOLD';
			buyer = highestoffer.member;
			seller = listing.vehicle.owner;

			//update the balace of the seller 
			console.log('#### seller balance before: '+ seller.balance);
			seller.balance += highestoffer.bidPrice;
			console.log('#### seller balance after: '+ seller.balance);

			//update the balance of the buyer 
			console.log('#### buyer balance before: '+ buyer.balance);
			buyer.balance -= highestoffer.bidPrice;
			console.log('#### buyer balance after: '+ buyer.balance);

			//transfer vehicle
			listing.vehicle.owner = buyer;

			//clear offers
			listing.offers = null;
		}
	}

	if(highestOffer)
	{
		//save vehicle
		const vehicleRegistry = await getAssetRegistry('org.dypcets.auction.Vehicle');
		await VehicleRegistry.update(listing.vehicle);
	}

	//save the vehicle listing
	const vehicleListingRegistry = await getParticipantRegistry('org.dypcets.auction.VehicleListing');
	await vehicleListingRegistry.update(listing);

	if(listing.state === 'SOLD') 
	{
		//save the buyer
		const userRegistry = await getParticipantRegistry('org.dypcets.auction.Member');
		await userRegistry.updateAll([buyer,seller]);
	}
}

/**
	*offer
	*@param{org.dypcets.auction}
	*transaction
*/

async function makeOffer(offer)
{
	// 
	let listing = offer.listing;
	if(listing.state !== 'FOR_SALE')
	{
		throw new Error('listing is NOT FOR_SALE');
	}

	if(!listing.offers)
	{
		listing.offers = [];
	}

	listing.offers.push(offer);

	//save the vehicle listing
	const vehicleListingRegistry = await getAssetRegistry('org.dypcets.auction.VehicleListing');
	await vehicleListingRegistry.update(listing);
}