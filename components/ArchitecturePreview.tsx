import React from 'react';
import { ProjectConfig } from '../types';
import { TOOLS } from '../constants';
import { 
  ArrowRight, Database, Server, Layers, Workflow, 
  BarChart, Zap, Activity, GitBranch, Box, Shield 
} from 'lucide-react';

interface Props {
  config: ProjectConfig;
}

const ArchitecturePreview: React.FC<Props> = ({ config }) => {
  const getToolName = (id: string | null) => {
    if (!id) return null;
    return TOOLS.find(t => t.id === id)?.name || id;
  };

  // Build the dependency flow
  const nodes = [
    { id: 'src', label: 'Sources', sub: 'API / DB / Files', type: 'source' },
    { id: 'ing', label: 'Ingestion', sub: getToolName(config.tools.ingestion) || 'Pending', tool: config.tools.ingestion },
    { id: 'raw', label: 'Bronze Layer', sub: 'Raw Data', type: 'storage' },
    { id: 'trn', label: 'Transformation', sub: getToolName(config.tools.transformation) || 'Pending', tool: config.tools.transformation },
    { id: 'cln', label: 'Silver/Gold', sub: 'Modeled Data', type: 'storage' },
  ];

  if (config.tools.quality) {
    nodes.push({ id: 'qlty', label: 'Data Quality', sub: getToolName(config.tools.quality) || 'Validation', tool: config.tools.quality });
  }

  nodes.push({ id: 'viz', label: 'Analytics', sub: getToolName(config.tools.visualization) || 'Pending', tool: config.tools.visualization });

  return (
    <div className="bg-slate-900 rounded-lg h-full overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-900 sticky top-0 z-10">
         <h3 className="text-slate-200 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            System Architecture (Data Flow)
         </h3>
      </div>

      {/* Visualizer */}
      <div className="flex-1 p-6 relative">
         <div className="flex flex-col space-y-6 relative">
            
            {/* Orchestrator Wrapper */}
            {config.tools.orchestration && (
              <div className="absolute top-0 bottom-0 left-8 right-0 border-l-2 border-dashed border-purple-800/50 rounded-lg pointer-events-none z-0">
                 <div className="absolute top-1/2 -left-3 bg-slate-900 p-1">
                    <Workflow className="w-5 h-5 text-purple-500" />
                 </div>
                 <span className="absolute top-2 left-4 text-xs font-mono text-purple-500/80 uppercase">
                    Orquestado por {getToolName(config.tools.orchestration)}
                 </span>
              </div>
            )}

            {nodes.map((node, idx) => (
              <div key={idx} className="flex items-center gap-4 relative z-10 pl-6 group">
                 {/* Connection Line */}
                 {idx < nodes.length - 1 && (
                   <div className="absolute left-[3.25rem] top-10 w-0.5 h-8 bg-slate-700 group-hover:bg-cyan-500/50 transition-colors"></div>
                 )}

                 {/* Node Icon */}
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg transition-all ${
                    node.tool || node.type ? 'bg-slate-800 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-600'
                 }`}>
                    {idx === 0 && <Database className="w-5 h-5" />}
                    {idx === 1 && <Layers className="w-5 h-5" />}
                    {idx === 2 && <Box className="w-5 h-5 text-amber-500" />}
                    {idx === 3 && <Activity className="w-5 h-5" />}
                    {idx === 4 && <Box className="w-5 h-5 text-yellow-400" />}
                    {node.id === 'qlty' && <Shield className="w-5 h-5 text-green-400" />}
                    {node.id === 'viz' && <BarChart className="w-5 h-5" />}
                 </div>

                 {/* Node Content */}
                 <div className="flex-1 bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-sm group-hover:border-cyan-500/30 transition-colors">
                    <div className="text-xs font-mono text-slate-500 uppercase flex justify-between">
                        {node.label}
                        {node.id === 'qlty' && <span className="text-[10px] bg-green-900 text-green-300 px-1 rounded">Gate</span>}
                    </div>
                    <div className="text-sm font-bold text-slate-200">{node.sub}</div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Explanation Section */}
      <div className="p-6 bg-slate-950 border-t border-slate-800">
         <h4 className="text-slate-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Descripción del Pipeline
         </h4>
         
         <div className="space-y-4 text-sm text-slate-300">
            {config.tools.ingestion && (
               <p><strong className="text-white">Ingesta:</strong> {getToolName(config.tools.ingestion)} conecta a las fuentes y mueve los datos crudos a la capa <strong>Bronze</strong> (Raw).</p>
            )}
            
            {config.tools.transformation === 'dbt' && (
               <p><strong className="text-white">Transformación:</strong> dbt toma los datos de Bronze, aplica limpieza (-> <strong>Silver</strong>) y agregaciones de negocio (-> <strong>Gold</strong>).</p>
            )}

            {config.tools.quality && (
               <p><strong className="text-white">Calidad:</strong> {getToolName(config.tools.quality)} ejecuta validaciones automáticas antes de exponer los datos a analítica.</p>
            )}

            {config.tools.orchestration && (
               <p><strong className="text-white">Orquestación:</strong> {getToolName(config.tools.orchestration)} programa los jobs. Si falla un paso, alerta y reintenta automáticamente.</p>
            )}
         </div>
      </div>
    </div>
  );
};

export default ArchitecturePreview;
