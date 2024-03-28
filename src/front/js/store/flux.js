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
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				if (token && token != "" && token != undefined) setStore({ token: token });
			},

			signup: async (email, password) => {
				try {
					const res = await fetch("https://ominous-goldfish-v6v7pwp9jj9qcwvrq-3001.app.github.dev/api/users", {
						method: 'POST',
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (res.status === 200) {
						alert("Registration success!");
						return true;
					} else if (res.status === 401) {
						const errorData = await res.json();
						alert(errorData.msg)
						return false
					};
				} catch (error) {
					console.error("There has been an error:", error);
					return false;
				}
			},


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
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			},
		}
	}
};


export default getState;
