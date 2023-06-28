import boto3
import json

def lambda_handler(event, context):
    return get_all_resources()
   
def get_all_resources():
    
    # Initialize the AWS service client
    client = boto3.client('resourcegroupstaggingapi')
    
    #Retrieve all resources with tags
    response = client.get_resources()
    
    all_resources = []
    all_resources.extend(response['ResourceTagMappingList'])
    
    #HTTP response
    http_res={}
    http_res = {
        'statusCode': 200,
        'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET'
        },
        'body': json.dumps(all_resources)
    }

    return http_res



 

