const GetUserAuth = (loginAttempt) => {
	const URL = 'http://api.bowspace.ca/rest/auth/login';
	const headers = new Headers({
		'Content-Type': 'application/x-www-form-urlencoded',
	})
    return (Promise.resolve())
			.then(() => {
                const RequestOptions = { method:"POST", headers : headers, cache:'no-cache', mode:'cors', credentials:'omit', redirect:'error', body:JSON.stringify(loginAttempt) };
				return (fetch(URL, RequestOptions));
			})
			.then((Response) => {
				return (Response.json())
			});
}

function GetUserList(token, id) {
    console.log('my fetch');
    var url = 'http://api.bowspace.ca/rest/users?userid=' + id +'&keywords=';
    const headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
    })
    const otherPrams = {
        headers: headers,
        method: 'GET',
        mode: 'cors',
        cache: "no-cache",
        credentials: 'omit',
        headers : new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',

        Authorization: 'Bearer' + token
        })
    };


   return (fetch(url, otherPrams).then(data=>data.json()))

}

const GetMyPost = (loginUserId, loginToken) => {
	const URL = 'http://api.bowspace.ca/rest/posts';
	const headers = new Headers({
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Bearer ' + loginToken
	})
	const param = '?postid=0&senderid=0&recipientid='+ loginUserId +'&keywords=' 
	return (Promise.resolve())
			.then(() => {
                const RequestOptions = { method:"GET", headers : headers, cache:'no-cache', mode:'cors', credentials:'omit', redirect:'error' };
				return (fetch(URL + param, RequestOptions));
			})
			.then((Response) => {
				return (Response.json())
			});
}


export { GetUserAuth, GetUserList, GetMyPost };