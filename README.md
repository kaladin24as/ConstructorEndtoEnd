# DataForge CLI Generator

A robust, interactive CLI tool for scaffolding enterprise-grade Data Engineering & Analytics projects.

## Features
- **Interactive Wizard**: Rich terminal UI to select stack components.
- **Real Code Generation**: Produces executable Docker Compose, Python, dbt, and Terraform files.
- **Architecture Preview**: Visual tree of the project structure before generation.
- **Extensible Templates**: Jinja2-based templating system.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

```bash
python -m data_project_generator.cli create
```

## Project Structure generated
- `ingestion/`: ELT pipelines (Airbyte/Custom Python)
- `lakehouse/`: Bronze/Silver/Gold layers
- `transformations/`: dbt projects / Spark jobs
- `orchestration/`: Airflow DAGs / Dagster repositories
- `infra/`: Terraform / Docker Compose
- `docs/`: Architecture diagrams and setup guides
