resource "aws_vpc"  "main" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        Name = "migration-lab-vpc"
    }
}

resource "aws_subnet" "public-subnet" { // const subnet = new aws.ec2.Subnet("public-subnet", {
    vpc_id = aws_vpc.main.id
    cidr_block =  "10.0.1.0/24"
    availability_zone = "ap-south-1a"
    map_public_ip_on_launch = true
    tags = {
        Name = "migration-lab-subnet"
    }
}

resource "aws_security_group" "web-sg" { // const sg = new aws.ec2.SecurityGroup("web-sg", {
    vpc_id = aws_vpc.main.id
    description= "Allow SSH"
    ingress{
        protocol= "tcp"
        from_port= 22
        to_port= 22
        cidr_blocks= ["0.0.0.0/0"]
    }
    egress {
        protocol= "-1"
        from_port= 0
        to_port= 0
        cidr_blocks= ["0.0.0.0/0"]
    }
    tags= {
        Name= "migration-lab-sg"
    }
}

resource "aws_s3_bucket" "demo-bucket" { // const bucket = new aws.s3.Bucket("demo-bucket", {
    tags= {
        Name= "migration-lab-bucket"
    }
}