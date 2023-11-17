const getState = ({ getStore, getActions, setStore }) => {
	return {
		
		store: {
			user: {},
			message: null,
			email: "",
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setUser: (info) => {
				setStore({ "user": info })
			},
			deleteToken:() => {
				const newObj = {};
				setStore({"user": newObj});
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			getLogin: async (email, password) => {
					// fetching data from the backend
					const options = {
						'method': 'POST', 
						'body': JSON.stringify({"email": email, "password": password}),								
						'header': {"Content-Type": "application/json"}
					}
					const response = await fetch(process.env.BACKEND_URL + "/api/login", options)
						if (!response.ok) {
							console.log("Error loading message from backend", response.status, response.statusText)
							return {'status': response.status, 'status text': response.statusText}
						}
						const data = await response.json();
						localStorage.setItem("token", data.access_token);
						setStore({ email: email })
									// don't forget to return something, that is how the async resolves
						return data;					
							},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
