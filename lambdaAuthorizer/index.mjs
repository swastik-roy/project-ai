export const handler = async(event) => {
    console.log('event', event)

    const token = event['authorizationToken']

    console.log('token', token)
    
    
    let permission = "Deny";
    if(token === "1234") {
    	permission = "Allow"
    }
    const authResponse = { 
        "principalId": "abc123", 
        "policyDocument": 
            { 
                "Version": "2012-10-17", 
                "Statement": 
                        [
                            {
                                "Action": "execute-api:Invoke", 
                                "Resource": ["arn:aws:execute-api:us-east-1:021903533644:64zpdy0rs5/develop/GET/resources"], 
                                "Effect": `${permission}`
                            }
                        ]
            }
        
    }
    return authResponse;
};