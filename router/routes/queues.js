module.exports = function (router) {
	router.route('/queues')
		.get(function (req, res) {
				res.json({
				message: 'get all queues'
			});
		});

	router.route('/queues/:id')
		.get(function (req, res) {
			res.json({
				message: 'get queue by id'
			});
		})
		.patch(function (req, res) {
			res.json({
				message: 'update queue by id',
				examples: [
					{
						op: 'push',
						id: 'dgm3df'
					},
					{
						op: 'pop'
					},
					{
						op: 'remove',
						id: 'dgm3df'
					}
				]
			});
		})
		.delete(function (req, res) {
			res.json({
				message: 'delete queue by id'
			});
		});


};