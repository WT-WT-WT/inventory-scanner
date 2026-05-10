# Product Scanner App

A mobile app for scanning products to check inventory.

## Features

- Scan barcodes to check if product is in inventory
- Add new products with name and barcode
- View list of all products in inventory

## Requirements

- Node.js (preferably >=20)
- Expo CLI
- Android Studio (for Android emulator) or physical device

## Installation

1. Install dependencies: `npm install`
2. Start the app: `npx expo start`
3. Run on Android: `npm run android`

Or use Expo Go app on device by scanning the QR code from `npx expo start`.

## Usage

- **Home screen**: Choose to scan, add product, or view inventory
- **Scan**: Point camera at barcode, app will check if in inventory
- **Add**: Enter product name and barcode
- **Inventory**: List of all products