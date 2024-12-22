export default function Reviews() {
    const reviews = [
      {
        id: 1,
        name: 'Sione',
        date: 'Posted on 15 Nov 2021',
        rating: 5,
        comment: 'He was very helpful and he also make sure that I get the information I needed. 100% great'
      },
      {
        id: 2,
        name: 'Jean',
        date: 'Posted on 14 Nov 2021',
        rating: 5,
        comment: 'Very informative on the road rules. Very patient and nice'
      },
      {
        id: 3,
        name: 'Dhinay',
        date: 'Posted on 13 Nov 2021',
        rating: 5,
        comment: 'He\'s been a great instructor. He not only trains you for the test specifically but also for the long run about how to be great and responsible fellow driver. Got 2 full lessons from him and I was there. Cracked the DT in first attempt. Highly recommend him'
      }
    ]
  
    return (
      <section className="bg-white rounded-xl border p-6">
        <h2 className="text-xl font-semibold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex text-yellow-400">{'★'.repeat(review.rating)}</div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  