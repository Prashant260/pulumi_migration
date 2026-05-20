# Infrastructure Migration Lab

This repository contains a small AWS infrastructure migration lab with two
separate implementations of the same target resources:

- `migration-lab/` - Pulumi TypeScript project.
- `tofu-migration/` - OpenTofu/Terraform-style project.

The lab is useful for comparing how infrastructure definitions, state, preview
plans, and deployment workflows differ between Pulumi and OpenTofu.

## Target Infrastructure

Both projects model the following AWS resources:

- VPC with CIDR block `10.0.0.0/16`
- Public subnet with CIDR block `10.0.1.0/24`
- Security group allowing SSH on port `22`
- S3 bucket tagged as `migration-lab-bucket`

The Pulumi stack is configured for `ap-south-1`, and the subnet is pinned to
`ap-south-1a`.

## Project READMEs

Read the project-specific documentation before running commands:

- [Pulumi migration README](migration-lab/README.md)
- [OpenTofu migration README](tofu-migration/README.md)

## Suggested Migration Workflow

1. Review the existing Pulumi implementation in `migration-lab/index.ts`.
2. Review the OpenTofu implementation in `tofu-migration/main.tf`.
3. Compare resource names, tags, CIDR blocks, and region settings.
4. Run preview/plan commands before applying either project.
5. Keep only one tool responsible for the live infrastructure unless you are
   intentionally testing state migration or imports.

## Safety Notes

- This lab creates real AWS resources and may incur cost.
- The security group currently allows SSH from `0.0.0.0/0`; restrict this CIDR
  before using the configuration outside a lab environment.
- The OpenTofu project currently uses local state files. Do not commit real
  production state or secrets to source control.
