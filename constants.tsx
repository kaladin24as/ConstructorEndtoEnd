import { Tool, FileNode, ProjectTemplate, ProjectConfig } from './types';
import { 
  Cloud, Database, Server, Layers, 
  Workflow, BarChart, Box, Settings, Shield 
} from 'lucide-react';

export const TOOLS: Tool[] = [
  // Cloud
  { id: 'aws', name: 'AWS', category: 'cloud', icon: 'Cloud', description: 'Amazon Web Services (S3, EMR, Redshift)' },
  { id: 'gcp', name: 'Google Cloud', category: 'cloud', icon: 'Cloud', description: 'Google Cloud Platform (GCS, BigQuery)' },
  { id: 'azure', name: 'Azure', category: 'cloud', icon: 'Cloud', description: 'Microsoft Azure (ADLS, Synapse)' },
  
  // Ingestion
  { id: 'airbyte', name: 'Airbyte', category: 'ingestion', icon: 'Layers', description: 'ELT: Open-source data integration' },
  { id: 'fivetran', name: 'Fivetran', category: 'ingestion', icon: 'Layers', description: 'ELT: Automated managed data movement' },
  { id: 'kafka', name: 'Kafka', category: 'ingestion', icon: 'Layers', description: 'Streaming: Distributed event streaming' },
  { id: 'python', name: 'Custom Python', category: 'ingestion', icon: 'Layers', description: 'Custom: Requests/Pandas scripts' },

  // Warehouse/Storage
  { id: 'snowflake', name: 'Snowflake', category: 'warehouse', icon: 'Database', description: 'Warehouse: Cloud Data Warehouse' },
  { id: 'bigquery', name: 'BigQuery', category: 'warehouse', icon: 'Database', description: 'Warehouse: Serverless Data Warehouse' },
  { id: 'duckdb', name: 'DuckDB', category: 'warehouse', icon: 'Database', description: 'OLAP: In-process high-performance SQL' },
  { id: 'postgres', name: 'PostgreSQL', category: 'warehouse', icon: 'Database', description: 'OLTP/OLAP: Reliable Relational Database' },
  { id: 's3', name: 'Data Lake (S3/MinIO)', category: 'warehouse', icon: 'Database', description: 'Lake: Object Storage (Parquet/Delta)' },

  // Transformation
  { id: 'dbt', name: 'dbt Core', category: 'transformation', icon: 'Settings', description: 'SQL-based transformation & modeling' },
  { id: 'spark', name: 'Apache Spark', category: 'transformation', icon: 'Settings', description: 'Distributed data processing' },
  { id: 'polars', name: 'Polars', category: 'transformation', icon: 'Settings', description: 'Lightning-fast DataFrame library' },

  // Orchestration
  { id: 'airflow', name: 'Apache Airflow', category: 'orchestration', icon: 'Workflow', description: 'Platform to programmatically author workflows' },
  { id: 'dagster', name: 'Dagster', category: 'orchestration', icon: 'Workflow', description: 'Cloud-native data orchestrator' },
  { id: 'prefect', name: 'Prefect', category: 'orchestration', icon: 'Workflow', description: 'Modern workflow coordination' },

  // Visualization
  { id: 'superset', name: 'Apache Superset', category: 'visualization', icon: 'BarChart', description: 'Modern enterprise BI' },
  { id: 'metabase', name: 'Metabase', category: 'visualization', icon: 'BarChart', description: 'Easy, open source business intelligence' },
  { id: 'streamlit', name: 'Streamlit', category: 'visualization', icon: 'BarChart', description: 'Interactive data apps in Python' },
  { id: 'jupyter', name: 'Jupyter Notebooks', category: 'visualization', icon: 'BarChart', description: 'Interactive computing & analysis' },

  // IaC
  { id: 'terraform', name: 'Terraform', category: 'iac', icon: 'Server', description: 'Infrastructure as Code' },
  
  // Container
  { id: 'docker', name: 'Docker', category: 'container', icon: 'Box', description: 'Containerization & Compose' },

  // Quality & Governance
  { id: 'great_expectations', name: 'Great Expectations', category: 'quality', icon: 'Shield', description: 'Data quality & validation' },
  { id: 'soda', name: 'Soda', category: 'quality', icon: 'Shield', description: 'Data observability & contracts' },
];

export const TEMPLATES: ProjectTemplate[] = [
  {
    id: 'lakehouse',
    name: 'Modern Data Lakehouse',
    description: 'Arquitectura Medallion completa (Bronze/Silver/Gold) usando S3, Spark/dbt y Airflow.',
    config: {
      cloud: 'aws',
      ingestion: 'airbyte',
      warehouse: 's3',
      transformation: 'spark',
      orchestration: 'airflow',
      visualization: 'superset',
      iac: 'terraform',
      container: 'docker',
      quality: 'great_expectations'
    }
  },
  {
    id: 'streaming',
    name: 'Real-time Streaming',
    description: 'Pipeline de eventos en tiempo real con Kafka, Spark Streaming y DuckDB.',
    config: {
      cloud: 'aws',
      ingestion: 'kafka',
      warehouse: 'duckdb',
      transformation: 'spark',
      orchestration: 'prefect',
      visualization: 'metabase',
      iac: 'terraform',
      container: 'docker',
      quality: null
    }
  },
  {
    id: 'mds',
    name: 'Modern Data Stack (MDS)',
    description: 'Stack estándar: Snowflake (Warehouse), dbt (Transform), Airflow (Orchestrate).',
    config: {
      cloud: 'aws',
      ingestion: 'fivetran',
      warehouse: 'snowflake',
      transformation: 'dbt',
      orchestration: 'airflow',
      visualization: 'superset',
      iac: 'terraform',
      container: 'docker',
      quality: 'great_expectations'
    }
  },
  {
    id: 'local-analytics',
    name: 'Local Analytics Engineer',
    description: 'Stack ligero y potente para análisis local: DuckDB + dbt + Streamlit + Jupyter.',
    config: {
      cloud: null,
      ingestion: 'python',
      warehouse: 'duckdb',
      transformation: 'dbt',
      orchestration: 'prefect',
      visualization: 'jupyter',
      iac: null,
      container: 'docker',
      quality: null
    }
  }
];

// --- Templates for File Content ---

const README_TEMPLATE = (config: ProjectConfig) => `# ${config.projectName}

${config.description}

## Arquitectura del Proyecto

Este proyecto sigue una arquitectura moderna de ingeniería de datos, diseñada para escalabilidad y mantenibilidad.

### Stack Tecnológico
| Capa | Herramienta | Descripción |
|------|-------------|-------------|
| **Infra** | ${config.tools.cloud || 'Local'} / ${config.tools.iac || 'Manual'} | Infraestructura base |
| **Ingesta** | ${config.tools.ingestion || 'N/A'} | Movimiento de datos raw |
| **Almacenamiento** | ${config.tools.warehouse || 'N/A'} | Bronze -> Silver -> Gold (Medallion) |
| **Transformación** | ${config.tools.transformation || 'N/A'} | Limpieza y modelado |
| **Orquestación** | ${config.tools.orchestration || 'N/A'} | Gestión de dependencias y schedule |
| **Visualización** | ${config.tools.visualization || 'N/A'} | Dashboards e insights |
| **Calidad** | ${config.tools.quality || 'N/A'} | Tests y validación de datos |

## Guía de Inicio Rápido

### 1. Requisitos Previos
- Docker & Docker Compose v2+
- Python 3.9+
- ${config.tools.iac === 'terraform' ? 'Terraform CLI' : ''}

### 2. Configuración de Entorno
Copia el archivo de ejemplo y ajusta tus credenciales:
\`\`\`bash
cp .env.example .env
\`\`\`

### 3. Despliegue de Servicios (Docker)
Levanta toda la infraestructura local (Database, Orchestrator, Viz tools):
\`\`\`bash
docker-compose up -d
\`\`\`
Accede a los servicios en:
${config.tools.orchestration === 'airflow' ? '- Airflow: http://localhost:8080\n' : ''}- MinIO (S3): http://localhost:9001
${config.tools.visualization === 'superset' ? '- Superset: http://localhost:8088\n' : ''}${config.tools.visualization === 'metabase' ? '- Metabase: http://localhost:3000\n' : ''}${config.tools.visualization === 'jupyter' ? '- Jupyter: http://localhost:8888\n' : ''}

### 4. Setup de Desarrollo
\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
\`\`\`

Generado por **DataForge Studio**.
`;

const DOCKER_COMPOSE_TEMPLATE = (config: ProjectConfig) => {
  let services = `version: '3.8'\n\nservices:\n`;
  let volumes = `volumes:\n`;

  // --- Storage ---
  if (config.tools.warehouse === 'postgres' || config.tools.orchestration === 'airflow' || config.tools.visualization === 'metabase') {
    services += `  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: warehouse
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - data-network\n\n`;
    
    if (!volumes.includes('postgres_data')) volumes += `  postgres_data:\n`;
  }

  if (config.tools.warehouse === 's3') {
    services += `  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: admin
      MINIO_ROOT_PASSWORD: password
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    networks:
      - data-network\n\n`;
      
    if (!volumes.includes('minio_data')) volumes += `  minio_data:\n`;
  }

  // --- Ingestion / Streaming ---
  if (config.tools.ingestion === 'kafka') {
    services += `  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    networks:
      - data-network

  kafka:
    image: confluentinc/cp-kafka:7.3.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    networks:
      - data-network\n\n`;
  }

  // --- Orchestration ---
  if (config.tools.orchestration === 'airflow') {
    services += `  airflow-webserver:
    image: apache/airflow:2.7.0
    command: webserver
    ports:
      - "8080:8080"
    environment:
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://user:password@postgres/airflow
      - AIRFLOW__CORE__FERNET_KEY=FB0o_zt4e3Zkkka39254dC7k0j2ptx3jytrD4pDmvFw=
      - AIRFLOW__CORE__LOAD_EXAMPLES=False
    volumes:
      - ./orchestration/dags:/opt/airflow/dags
    depends_on:
      - postgres
    networks:
      - data-network
  
  airflow-scheduler:
    image: apache/airflow:2.7.0
    command: scheduler
    environment:
      - AIRFLOW__CORE__EXECUTOR=LocalExecutor
      - AIRFLOW__DATABASE__SQL_ALCHEMY_CONN=postgresql+psycopg2://user:password@postgres/airflow
      - AIRFLOW__CORE__FERNET_KEY=FB0o_zt4e3Zkkka39254dC7k0j2ptx3jytrD4pDmvFw=
      - AIRFLOW__CORE__LOAD_EXAMPLES=False
    volumes:
      - ./orchestration/dags:/opt/airflow/dags
    depends_on:
      - postgres
    networks:
      - data-network\n\n`;
  } else if (config.tools.orchestration === 'prefect') {
    services += `  prefect-server:
    image: prefecthq/prefect:2.0
    command: prefect server start --host 0.0.0.0
    ports:
      - "4200:4200"
    networks:
      - data-network\n\n`;
  }

  // --- Visualization ---
  if (config.tools.visualization === 'superset') {
    services += `  superset:
    image: apache/superset
    ports:
      - "8088:8088"
    networks:
      - data-network\n\n`;
  } else if (config.tools.visualization === 'metabase') {
    services += `  metabase:
    image: metabase/metabase
    ports:
      - "3000:3000"
    environment:
      MB_DB_TYPE: postgres
      MB_DB_DBNAME: warehouse
      MB_DB_PORT: 5432
      MB_DB_USER: user
      MB_DB_PASS: password
      MB_DB_HOST: postgres
    networks:
      - data-network\n\n`;
  } else if (config.tools.visualization === 'jupyter') {
    services += `  jupyter:
    image: jupyter/pyspark-notebook:latest
    ports:
      - "8888:8888"
    volumes:
      - ./notebooks:/home/jovyan/work
    environment:
      - JUPYTER_ENABLE_LAB=yes
    networks:
      - data-network\n\n`;
  }

  services += `networks:\n  data-network:\n\n`;
  services += volumes;

  return services;
};

// --- Generator Logic ---

export const generateFileStructure = (config: ProjectConfig): FileNode[] => {
  const root: FileNode[] = [];

  // 1. Root Config Files
  root.push({ name: 'README.md', type: 'file', content: README_TEMPLATE(config) });
  root.push({ name: '.gitignore', type: 'file', content: `venv/\n__pycache__/\n.env\n*.log\n.DS_Store\n.terraform/\n.ipynb_checkpoints/` });
  root.push({ name: '.env.example', type: 'file', content: `ENVIRONMENT=dev\nDB_HOST=localhost\nDB_PORT=5432\nDB_USER=user\nDB_PASS=password\nAWS_ACCESS_KEY_ID=xxx\nAWS_SECRET_ACCESS_KEY=xxx` });
  
  let requirements = `pandas\npython-dotenv\n`;
  if (config.tools.orchestration === 'airflow') requirements += `apache-airflow\n`;
  if (config.tools.orchestration === 'prefect') requirements += `prefect\n`;
  if (config.tools.transformation === 'dbt') requirements += `dbt-core\ndbt-postgres\n`;
  if (config.tools.transformation === 'polars') requirements += `polars\n`;
  if (config.tools.ingestion === 'kafka') requirements += `kafka-python\n`;
  if (config.tools.quality === 'great_expectations') requirements += `great_expectations\n`;
  
  root.push({ name: 'requirements.txt', type: 'file', content: requirements });

  // 2. Infrastructure (IaC)
  if (config.tools.iac === 'terraform') {
    const tfContent = config.tools.cloud === 'aws' 
      ? `provider "aws" {\n  region = "us-east-1"\n}\n\nresource "aws_s3_bucket" "data_lake" {\n  bucket = "${config.projectName}-lake"\n}`
      : `provider "google" {\n  project = "${config.projectName}"\n}`;
    
    root.push({
      name: 'infrastructure',
      type: 'folder',
      children: [
        { name: 'main.tf', type: 'file', content: tfContent },
        { name: 'variables.tf', type: 'file', content: 'variable "env" { default = "dev" }' },
        { name: 'outputs.tf', type: 'file', content: '' }
      ]
    });
  }

  // 3. Ingestion Layer
  const ingestionChildren: FileNode[] = [];
  if (config.tools.ingestion === 'airbyte') {
    ingestionChildren.push({ name: 'airbyte_config.yaml', type: 'file', content: '# Define connectors here' });
  } else if (config.tools.ingestion === 'kafka') {
     ingestionChildren.push({ 
        name: 'producers', 
        type: 'folder', 
        children: [{ name: 'producer.py', type: 'file', content: 'from kafka import KafkaProducer\n# Producer logic here' }] 
     });
     ingestionChildren.push({ 
        name: 'consumers', 
        type: 'folder', 
        children: [{ name: 'consumer.py', type: 'file', content: 'from kafka import KafkaConsumer\n# Consumer logic here' }] 
     });
  } else if (config.tools.ingestion === 'python') {
    ingestionChildren.push({ 
      name: 'extract.py', 
      type: 'file', 
      content: `import requests\nimport pandas as pd\n\ndef extract_data():\n    # Logic to fetch data from API\n    pass\n\nif __name__ == "__main__":\n    extract_data()` 
    });
  }
  root.push({ name: 'ingestion', type: 'folder', children: ingestionChildren });

  // 4. Data Warehouse / Lakehouse Structure (Medallion)
  if (config.tools.warehouse) {
    const isLake = config.tools.warehouse === 's3' || config.tools.warehouse === 'gcp';
    
    // Structure for Data/Storage
    const storageChildren: FileNode[] = [
      { name: 'bronze', type: 'folder', children: [{ name: '.gitkeep', type: 'file' }] },
      { name: 'silver', type: 'folder', children: [{ name: '.gitkeep', type: 'file' }] },
      { name: 'gold', type: 'folder', children: [{ name: '.gitkeep', type: 'file' }] }
    ];

    if (isLake) {
        root.push({ name: 'data_lake', type: 'folder', children: storageChildren });
    } else {
        root.push({
            name: 'warehouse',
            type: 'folder',
            children: [
                { name: 'init.sql', type: 'file', content: 'CREATE SCHEMA IF NOT EXISTS bronze;\nCREATE SCHEMA IF NOT EXISTS silver;\nCREATE SCHEMA IF NOT EXISTS gold;' }
            ]
        });
    }
  }

  // 5. Transformation
  if (config.tools.transformation === 'dbt') {
    root.push({
      name: 'transformations',
      type: 'folder',
      children: [
        {
            name: 'dbt_project',
            type: 'folder',
            children: [
                { name: 'dbt_project.yml', type: 'file', content: `name: '${config.projectName}'\nversion: '1.0.0'\nprofile: 'default'` },
                { 
                    name: 'models', 
                    type: 'folder', 
                    children: [
                        { name: 'staging', type: 'folder', children: [{name: 'stg_users.sql', type: 'file', content: 'SELECT * FROM source_users'}] },
                        { name: 'marts', type: 'folder', children: [{name: 'dim_customers.sql', type: 'file', content: 'SELECT * FROM stg_users'}] }
                    ]
                },
                { name: 'tests', type: 'folder', children: [{name: '.gitkeep', type: 'file'}] }
            ]
        }
      ]
    });
  } else if (config.tools.transformation === 'spark') {
    root.push({
        name: 'transformations',
        type: 'folder',
        children: [
            { name: 'spark_jobs', type: 'folder', children: [
                { name: 'bronze_to_silver.py', type: 'file', content: 'spark.read.format("parquet").load("s3://bronze")...' },
                { name: 'silver_to_gold.py', type: 'file', content: '# Aggregation logic' }
            ]}
        ]
    });
  }

  // 6. Orchestration
  if (config.tools.orchestration === 'airflow') {
    root.push({
      name: 'orchestration',
      type: 'folder',
      children: [
        { name: 'dags', type: 'folder', children: [
            { 
                name: 'main_etl_dag.py', 
                type: 'file', 
                content: `from airflow import DAG\nfrom airflow.operators.bash import BashOperator\nfrom datetime import datetime\n\nwith DAG('main_etl', start_date=datetime(2023, 1, 1)) as dag:\n    t1 = BashOperator(task_id='extract', bash_command='python ingestion/extract.py')` 
            }
        ]}
      ]
    });
  } else if (config.tools.orchestration === 'prefect') {
      root.push({
      name: 'orchestration',
      type: 'folder',
      children: [
        { name: 'flows', type: 'folder', children: [
            { name: 'etl_flow.py', type: 'file', content: '@flow\ndef main_flow():\n    pass' }
        ]}
      ]
    });
  }

  // 7. Visualization (Jupyter Notebooks)
  if (config.tools.visualization === 'jupyter') {
      root.push({
          name: 'notebooks',
          type: 'folder',
          children: [
              { name: 'exploratory_analysis.ipynb', type: 'file', content: '{ "cells": [], "metadata": {}, "nbformat": 4, "nbformat_minor": 5 }' }
          ]
      });
  }

  // 8. Quality
  if (config.tools.quality === 'great_expectations') {
      root.push({
          name: 'great_expectations',
          type: 'folder',
          children: [
              { name: 'great_expectations.yml', type: 'file', content: '# GX Config' },
              { name: 'expectations', type: 'folder', children: [{ name: '.gitkeep', type: 'file' }] },
              { name: 'checkpoints', type: 'folder', children: [{ name: '.gitkeep', type: 'file' }] }
          ]
      });
  }

  // 9. Containers
  if (config.tools.container === 'docker') {
    root.push({ name: 'docker-compose.yml', type: 'file', content: DOCKER_COMPOSE_TEMPLATE(config) });
  }

  return root;
};
