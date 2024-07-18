# Resume Rustification

Where CVs Meet Crab Code 🦀

Dive into the rusty waters of resume writing! This repo houses a Rust-powered resume generator that's more fun than a barrel of borrowck errors. It's not just code; it's a career compiler that turns your professional life into a beautifully rendered document.

## 🌟 Features

- Oxidizes your work experience into a sleek, printable format
- Memory-safe job descriptions (no undefined behavior in your career history!)
- Concurrency-friendly: parallelize your job search with ease
- Zero-cost abstractions of your skills (but infinite value to employers)
- Generates both HTML and Markdown outputs

## 🛠 Prerequisites

- Rust (latest stable version)
- Cargo (comes with Rust)

## 🧰 Usage

To generate a resume, use the following command:

```
cargo run -- --input <path_to_input_json> --output <path_to_output_file> --format <html|markdown>
```

For example:
```
cargo run -- --input ./test_data/html_input.json --output my_resume.html --format html
```

## 📄 Input Format

The input should be a JSON file with the following structure:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "linkedin": "Your LinkedIn URL",
  "email": "Your Email",
  "phone": "Your Phone Number",
  "summary": "A brief summary of your professional profile",
  "skills": ["Skill 1", "Skill 2", "..."],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "Job Location",
      "start_date": "Start Date",
      "end_date": "End Date",
      "responsibilities": ["Responsibility 1", "Responsibility 2", "..."]
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "graduation_year": "Graduation Year"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuer Name",
      "year": "Year"
    }
  ],
  "made_with": "URL to this project",
  "style": {
    "primary_color": "#HEX_COLOR",
    "secondary_color": "#HEX_COLOR",
    "font_family": "Font Family",
    "text_color": "#HEX_COLOR",
    "header_text_color": "#HEX_COLOR"
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or fork this. I just hacked this together because I needed a single-page resume and wanted a reason to get rusty.


## 🎉 Acknowledgments

- The Rust community for their endless inspiration
- All the job seekers out there hustling to land their dream roles

There are no null positions—only Options waiting to be unwrapped. 🎁

May your career be as memory-safe as your Rust code!