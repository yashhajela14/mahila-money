export function fetchPosts(){
	const endpoint = window.encodeURI(`https://my-json-server.typicode.com/yashhajela14/mockjson/db`)

return fetch(endpoint)
		.then((res) => res.json())
		.then((data)=>{
			return data.posts
		})



}