import React from 'react';
import { ProjectConfig } from '../types';

interface Props {
  config: ProjectConfig;
}

const ProjectSetup: React.FC<Props> = ({ config }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 h-full overflow-y-auto text-slate-300 font-mono text-sm leading-relaxed">
      <h1 className="text-xl font-bold text-white mb-4"># {config.projectName}</h1>
      <p className="mb-4 text-slate-400 border-b border-slate-800 pb-4">{config.description}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-cyan-400 mb-2">1. Estructura del Proyecto</h2>
          <p className="mb-2">El proyecto sigue el patrón <span className="text-white">Medallion Architecture</span>:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
            <li><code className="text-amber-500">/ingestion</code>: Scripts o configs para extraer datos.</li>
            <li><code className="text-amber-500">/warehouse</code> (o lake): Directorios para Bronze/Silver/Gold.</li>
            <li><code className="text-amber-500">/transformations</code>: Lógica de negocio ({config.tools.transformation || 'SQL/Python'}).</li>
            <li><code className="text-amber-500">/orchestration</code>: DAGs o definiciones de pipeline.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-cyan-400 mb-2">2. Quick Start (Local)</h2>
          <div className="bg-slate-950 p-4 rounded border border-slate-800 overflow-x-auto">
            <span className="text-slate-500"># 1. Configurar variables de entorno</span><br/>
            <code>cp .env.example .env</code><br/><br/>
            
            {config.tools.container === 'docker' ? (
              <>
                <span className="text-slate-500"># 2. Levantar Infraestructura (DB, Airflow, etc.)</span><br/>
                <code>docker-compose up -d</code><br/><br/>
              </>
            ) : (
               <>
                <span className="text-slate-500"># 2. Crear entorno virtual</span><br/>
                <code>python -m venv venv && source venv/bin/activate</code><br/>
                <code>pip install -r requirements.txt</code><br/><br/>
               </>
            )}

            {config.tools.transformation === 'dbt' && (
              <>
                <span className="text-slate-500"># 3. Ejecutar transformaciones</span><br/>
                <code>cd dbt_project && dbt run</code>
              </>
            )}
          </div>
        </section>

        <section>
            <h2 className="text-lg font-semibold text-cyan-400 mb-2">3. Componentes Activos</h2>
            <div className="grid grid-cols-1 gap-2">
                {config.tools.warehouse === 'postgres' && (
                    <div className="bg-slate-800 p-2 rounded text-xs flex justify-between">
                        <span>PostgreSQL (Warehouse)</span>
                        <span className="text-green-400">localhost:5432</span>
                    </div>
                )}
                {config.tools.orchestration === 'airflow' && (
                    <div className="bg-slate-800 p-2 rounded text-xs flex justify-between">
                        <span>Airflow Webserver</span>
                        <span className="text-green-400">localhost:8080</span>
                    </div>
                )}
                {config.tools.warehouse === 's3' && (
                    <div className="bg-slate-800 p-2 rounded text-xs flex justify-between">
                        <span>MinIO Console (S3 Mock)</span>
                        <span className="text-green-400">localhost:9001</span>
                    </div>
                )}
            </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectSetup;
