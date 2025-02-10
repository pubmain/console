const server = Bun.serve({
	port: 4000,
	fetch(req) {
		const url = new URL(req.url)
		const method = req.method

		if (method === "GET") {
			const text = decodeURIComponent(url.search.substring(1))
			switch (url.pathname) {
				case "/info":
					console.log("[INFO]", text)
					return new Response("Logged info", {status: 200})
				case "/warn":
					console.warn("[WARN]", text)
					return new Response("Logged warning", {status: 200})
				case "/print":
					console.log("[PRINT]", text)
					return new Response("Printed data", {status: 200})
				case "/error":
					console.error("[ERROR]", text)
					return new Response("Logged error", {status: 200})
				default:
					return new Response("Not Found", {status: 404})
			}
		}
		return new Response("Method Not Allowed", {status: 405})
	},
})

console.log("Console running on http://localhost:4000")
