function getRes(requestPath,requestBody,jwtHeader) {
    return fetch(requestPath,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        'Authorization': (jwtHeader !== null) ? ("JWT "+jwtHeader) :""
                    },
                    body: JSON.stringify(requestBody)
                }).then((response) => {
                 if(response.status === 401){
                     console.log("权限验证失败，状态码为：" + response.status);
                    window.location.href = "/arbiter/login";
                }
                 else if (response.status !== 200) {
                    console.log("存在一个问题，状态码为：" + response.status);
                    const error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }
                else
                    return response.json();
            })
}