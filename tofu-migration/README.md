# OpenTofu Migration Lab

This directory contains the OpenTofu version of the migration lab. It mirrors
the AWS resources defined in the Pulumi project at `../migration-lab`.

## What This Configuration Creates

The `main.tf` file defines:

- `aws_vpc.main` - AWS VPC with CIDR block `10.0.0.0/16`
- `aws_subnet.public-subnet` - public subnet with CIDR block `10.0.1.0/24`
- `aws_security_group.web-sg` - security group that allows SSH on port `22`
- `aws_s3_bucket.demo-bucket` - S3 bucket tagged for the migration lab

These resources correspond to the Pulumi resources named `main-vpc`,
`public-subnet`, `web-sg`, and `demo-bucket`.

## Prerequisites

- OpenTofu CLI
- AWS credentials configured through one of the standard AWS provider methods
- Access to create VPC, subnet, security group, and S3 resources in AWS

The current local OpenTofu version used while writing this README was:

- OpenTofu `v1.12.0`
- AWS provider `registry.opentofu.org/hashicorp/aws v6.45.0`

## Files

- `main.tf` - OpenTofu AWS resource definitions.
- `.terraform.lock.hcl` - provider lock file.
- `terraform.tfstate` - local state file.
- `terraform.tfstate.backup` - latest local state backup.
- `terraform.tfstate.*.backup` - previous local state backups.

## Initialize

From this directory:

```bash
tofu init
```

This installs the AWS provider version recorded in `.terraform.lock.hcl`.

## Validate

Check the configuration syntax:

```bash
tofu validate
```

Format the configuration if needed:

```bash
tofu fmt
```

## Plan

Review the planned infrastructure changes before applying:

```bash
tofu plan
```

Use the plan output to confirm that the resources match the Pulumi project:

- VPC CIDR: `10.0.0.0/16`
- Subnet CIDR: `10.0.1.0/24`
- Availability zone: `ap-south-1a`
- Tags using the `migration-lab-*` naming pattern
- SSH ingress on TCP port `22`

## Apply

Apply the OpenTofu configuration:

```bash
tofu apply
```

Review the proposed changes and approve only when the plan matches the expected
migration target.

## Migration Notes

This directory is intended to represent the OpenTofu target during migration
from the Pulumi implementation. The safest workflow is:

1. Compare `main.tf` with `../migration-lab/index.ts`.
2. Confirm the same resource attributes are represented in both tools.
3. Import existing AWS resources into OpenTofu state if the resources were
   originally created by Pulumi.
4. Run `tofu plan` until OpenTofu reports no unexpected changes.
5. Only then allow OpenTofu to become the owner of the live resources.

Do not run both Pulumi and OpenTofu as active managers for the same resources
unless you are intentionally testing migration behavior.

## Destroy

To remove resources managed by this OpenTofu state:

```bash
tofu destroy
```

Review the destroy plan carefully before approving.

## State Notes

This lab currently uses local state files. For team or production use, move
state to a remote backend with locking before applying changes.

Do not commit real production state files or secret values to source control.

## Security Notes

The security group currently allows SSH from `0.0.0.0/0`. Restrict this to a
trusted IP range before using the configuration outside a disposable lab.
