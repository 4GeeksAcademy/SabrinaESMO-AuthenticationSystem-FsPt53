const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			token: null,
			message: null,
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

			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

// /////
			signup: async (email, password) => {
				try {
					const response = await fetch(`https://ominous-goldfish-v6v7pwp9jj9qcwvrq-3001.app.github.dev/api/users`,
						{
							method: 'POST',
							body: JSON.stringify({
								email: email,
								password: password
							}),
							headers: {
								"Content-Type": "application/json"
							}
						});
					if (!response.ok) {
						alert("There has been an error");
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error creating the user", error);
				}
			},
// /////

			login: async (email, password) => {
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const response = await fetch(`https://ominous-goldfish-v6v7pwp9jj9qcwvrq-3001.app.github.dev/api/token`, options)
					if (response.status !== 200) {
						alert("There has been an error");
						return false;
					}
					const data = await response.json();
					localStorage.setItem("token", data.access_token)
					setStore({ token: data.access_token })
					return true;
				}
				catch (error) {
					console.error("There has been an error login in");
				}
			},

			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
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
	}
};


export default getState;
