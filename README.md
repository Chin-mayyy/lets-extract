# lets-extract

## Usage

Set API key in .env

```
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_KEY_GOES_HERE
```

Put your pdf files in /pdfs
The output will be in /output as a `.json` file for each pdf

The program will extract data from one pdf then exit
Run the program again with cron job to extract all pdfs

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/index.ts
```
