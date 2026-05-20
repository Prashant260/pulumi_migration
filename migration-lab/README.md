# Pulumi Migration Lab

This directory contains the Pulumi TypeScript version of the migration lab. It
defines a small AWS networking and storage stack that can be compared with the
OpenTofu version in `../tofu-migration`.

## What This Stack Creates

The Pulumi program in `index.ts` creates:

- `main-vpc` - AWS VPC with CIDR block `10.0.0.0/16`
- `public-subnet` - public subnet with CIDR block `10.0.1.0/24`
- `web-sg` - security group that allows SSH on port `22`
- `demo-bucket` - S3 bucket tagged for the migration lab

The stack exports:

- `vpcId`
- `subnetId`
- `bucketName`

## Prerequisites

- Pulumi CLI
- Node.js and npm
- AWS credentials configured through one of the standard AWS provider methods
- Access to create VPC, subnet, security group, and S3 resources in AWS

The current local tool versions used while writing this README were:

- Pulumi CLI `v3.242.0`
- AWS region configured as `ap-south-1`

## Files

- `Pulumi.yaml` - Pulumi project metadata.
- `Pulumi.dev.yaml` - stack configuration, including `aws:region`.
- `index.ts` - Pulumi resource definitions.
- `package.json` - Node.js dependencies.
- `tsconfig.json` - TypeScript configuration.
- `state.json` - exported/reference state file for the lab.

## Install Dependencies

From this directory:

```bash
npm install
```

The repository may already include `node_modules`, but `npm install` is the
repeatable setup command when preparing a fresh checkout.

## Select or Create the Stack

Use the existing `dev` stack if it is already available:

```bash
pulumi stack select dev
```

If the stack does not exist yet, create it:

```bash
pulumi stack init dev
pulumi config set aws:region ap-south-1
```

## Preview Changes

Always preview before deployment:

```bash
pulumi preview
```

Review the planned VPC, subnet, security group, and bucket changes before
continuing.

## Deploy

Apply the Pulumi stack:

```bash
pulumi up
```

After deployment, view stack outputs:

```bash
pulumi stack output
```

## Migration Notes

This Pulumi project is the source implementation for the lab resources. When
comparing it with OpenTofu, check that the following values match:

- VPC CIDR: `10.0.0.0/16`
- Subnet CIDR: `10.0.1.0/24`
- Availability zone: `ap-south-1a`
- Resource tags using the `migration-lab-*` naming pattern
- Security group ingress and egress rules

Do not let Pulumi and OpenTofu manage the same live AWS resources at the same
time unless you are intentionally testing an import or state migration workflow.

## Destroy

To remove resources created by this stack:

```bash
pulumi destroy
```

Remove the stack only after the resources are destroyed:

```bash
pulumi stack rm dev
```

## Security Notes

The security group currently allows SSH from `0.0.0.0/0`. This is convenient
for a lab, but it should be restricted to a trusted IP range before any
real-world use.
