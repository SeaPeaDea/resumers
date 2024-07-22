# Resume Rustification

Where CVs Meet Crab Code 🦀

Dive into the rusty waters of resume writing! This repo houses a Rust-powered resume generator that's more fun than writing async rust with traits. It's not just code; it's a career compiler that turns your professional life into a beautifully rendered document.

## 🌟 Features

- Oxidizes your work experience into sleek, printable HTML and Markdown formats
- Memory-safe job descriptions (no undefined behavior in your career history!)
- Concurrency-friendly: parallelize your job search with ease
- Zero-cost abstractions of your skills (but infinite value to employers)
- Web-based resume editor with real-time preview
- Customizable styling options
- Local storage support for saving and loading multiple resumes
- Export options: View in browser, download as HTML/Markdown, or save as PDF
- WASM-powered for lightning-fast resume generation in the browser
- CLI tool for generating resumes from the command line

## 🚀 Live Demo

Check out the live web application: [Resume Rustification Web App](https://seapeadea.github.io/resumers/)

## 🛠 Prerequisites

To work with this project, you'll need:

- Rust (latest stable version)
- Cargo (comes with Rust)
- Node.js (v18 or later recommended)
- npm (v8 or later recommended)

Make sure you have these tools installed and properly configured before proceeding.

## 🧰 Usage

### Web Application

1. Clone the repository
2. Navigate to the `webapp` directory
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and go to `http://localhost:5173`

The build process, including WASM compilation, is handled automatically by the Vite build setup.

### CLI Tool

To generate a resume using the CLI, use the following command:

```
cargo run -- --input <path_to_input_json> --output <path_to_output_file> --format <html|markdown>
```

For example:
```
cargo run -- --input ./src/test_data/test_input.json --output my_resume.html --format html
```

## 📄 Example Outputs

We've included example outputs inside the `examples/` folder to demonstrate what you can expect from our resume generator:

1. `John Doe - Resume.pdf`: A PDF version of the generated resume.
2. `John_Doe_resume.html`: An HTML version of the generated resume.
3. `John_Doe_resume.md`: A Markdown version of the generated resume.

These examples showcase the different formats our tool can produce. Feel free to check them out to get an idea of the final result!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or fork this project.

## 🎉 Acknowledgments

- The Rust community for their endless inspiration
- All the job seekers out there hustling to land their dream roles

There are no null positions—only Options waiting to be unwrapped. 🎁

May your career be as memory-safe as your Rust code!