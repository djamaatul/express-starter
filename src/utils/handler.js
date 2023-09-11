const handler = (fn, onError) => {
	return async (req, res, next) => {
		try {
			const { status = 200, ...response } = await fn(req, res, next) ?? {};

			if (!response.data) return next();

			res.status(status).json({
				code: 1,
				message: "Success",
				...response
			});
		} catch (error) {
			if (req.t && !req.t.finished) {
				await req.t.rollback();
			}
			if (onError) {
				return onError?.(error, req, res, next);
			}
			next(error);
		}
	};
};

module.exports = handler;