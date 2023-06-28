import json
import boto3

def lambda_handler(event, context):
    
    # Initialize the AWS service client
    ec2_client = boto3.client('ec2')
    
    # Get a list of all regions
    regions = ec2_client.describe_regions()['Regions']
    
    # Iterate over each region and retrieve resources
    all_resources = []
    for region in regions:
        region_name = region['RegionName']
        
        # Create a client for each region
        client = boto3.client('ec2', region_name=region_name)
        
        # Retrieve resources for the region
        resources = client.describe_instances()['Reservations']
        all_resources.extend(resources)

        # Add other resource types as needed (e.g., describe_vpcs, describe_subnets, etc.)
    
    return {
        'statusCode': 200,
        'body': json.dumps(all_resources)
    }
