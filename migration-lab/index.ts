import * as aws from "@pulumi/aws";
const vpc = new aws.ec2.Vpc("main-vpc", {
    cidrBlock: "10.0.0.0/16",
    enableDnsHostnames: true,
    enableDnsSupport: true,
    tags: {
        Name: "migration-lab-vpc",
    },
});

const subnet = new aws.ec2.Subnet("public-subnet", {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    availabilityZone: "ap-south-1a",
    mapPublicIpOnLaunch: true,
    tags: {
        Name: "migration-lab-subnet",
    },
});

const sg = new aws.ec2.SecurityGroup("web-sg", {
    vpcId: vpc.id,
    description: "Allow SSH",
    ingress: [{
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
        cidrBlocks: ["0.0.0.0/0"],
    }],
    egress: [{
        protocol: "-1",
        fromPort: 0,
        toPort: 0,
        cidrBlocks: ["0.0.0.0/0"],
    }],
    tags: {
        Name: "migration-lab-sg",
    },
});

const bucket = new aws.s3.Bucket("demo-bucket", {
    tags: {
        Name: "migration-lab-bucket",
    },
});



export const vpcId = vpc.id;
export const subnetId = subnet.id;
export const bucketName = bucket.id;
