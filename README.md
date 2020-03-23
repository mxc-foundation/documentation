![CI](https://github.com/mxc-foundation/documentation/workflows/CI/badge.svg?branch=master)

# MXC Documentation & Participation
MXC Documentation uses Docusaurus. Which means it's really easy for you, dear community members, to submit documentation suggestions and updates. Here are some quick tips on how to do this. 

## Getting Started

Clone this repository.

```git clone https://github.com/mxc-foundation/documentation```

Documents are located in the Docs folder. 

```cd docs```

You can edit any of the current documents when updates and improvements are needed.

### Editing Docs
Make sure that any edits you make are useful and add value. If you are adding any image assets, place them in the `/docs/assets` folder. 

### Creating New Docs
Adding a new document is extremely simple. Please follow our current file naming convention.

Our documentation is categorized to work for both users and developers. Unfortunately Docusaurus translations don't work if we categorize pages in directories. So we decided to use camel-case names.

If a page is for a "user" the first word in the file name should be ```user```

When in doubt, look at how our current document files are named. 

#### Required Information
Each document requires a bit of information at the top so that docusaurus can identify it. 

```---
id: userM2mWallet
title: M2M Wallet Balance
sidebar_label: Wallet Balance
--- ```


### Editing and Creating New Pages
If you want to modify the home page, you need to have some experience with REACT or get really familiar with the (Docusaurus Documentation)[https://docusaurus.io/docs/en/custom-pages].
