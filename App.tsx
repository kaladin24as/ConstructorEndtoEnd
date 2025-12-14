import React, { useState } from 'react';
import { ProjectConfig, ToolCategory, FileNode } from './types';
import { TOOLS, TEMPLATES, generateFileStructure } from './constants';
import FileExplorer from './components/FileExplorer';
import ArchitecturePreview from './components/ArchitecturePreview';
import ProjectSetup from './components/ProjectSetup';
import { 
  Rocket, Server, Database, Layers, Workflow, 
  BarChart, Box, Cloud, Code, ChevronRight, Check,
  Download, Sparkles, LayoutTemplate, Shield
} from 'lucide-react';
import JSZip from 'jszip';

const CATEGORIES: { id: ToolCategory; label: string; icon: any }[] = [
  { id: 'cloud', label: 'Proveedor Cloud', icon: Cloud },
  { id: 'ingestion', label: 'Ingesta de Datos', icon: Layers },
  { id: 'warehouse', label: 'Almacenamiento', icon: Database },
  { id: 'transformation', label: 'Procesamiento', icon: Code },
  { id: 'quality', label: 'Calidad & Gobierno', icon: Shield },
  { id: 'orchestration', label: 'Orquestación', icon: Workflow },
  { id: 'visualization', label: 'Visualización', icon: BarChart },
  { id: 'container', label: 'Contenedores', icon: Box },
  { id: 'iac', label: 'Infraestructura', icon: Server },
];

const App: React.FC = () => {
  const [config, setConfig] = useState<ProjectConfig>({
    projectName: 'mi-plataforma-datos',
    description: 'Pipeline end-to-end de ingeniería de datos.',
    author: 'data-team',
    tools: {
      cloud: null,
      ingestion: null,
      warehouse: null,
      transformation: null,
      orchestration: null,
      visualization: null,
      iac: null,
      container: null,
      quality: null,
    }
  });

  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'files' | 'arch' | 'setup'>('arch');
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleToolSelect = (category: ToolCategory, toolId: string) => {
    setConfig(prev => ({
      ...prev,
      tools: {
        ...prev.tools,
        [category]: prev.tools[category] === toolId ? null : toolId
      }
    }));
  };

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    setConfig(prev => ({
      ...prev,
      description: template.description,
      tools: { ...prev.tools, ...template.config }
    }));
    setShowTemplates(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const files = generateFileStructure(config);
      
      const addToZip = (folder: JSZip, nodes: FileNode[]) => {
        nodes.forEach(node => {
          if (node.type === 'folder') {
            const newFolder = folder.folder(node.name);
            if (newFolder && node.children) {
              addToZip(newFolder, node.children);
            }
          } else {
            folder.file(node.name, node.content || '');
          }
        });
      };

      addToZip(zip, files);
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${config.projectName}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting:", error);
      alert("Hubo un error al exportar el proyecto.");
    } finally {
      setIsExporting(false);
    }
  };

  const currentCategory = CATEGORIES[activeStep];
  const currentTools = TOOLS.filter(t => t.category === currentCategory?.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
              DataForge Studio
            </h1>
            <p className="text-xs text-slate-500">Automatización de Proyectos de Datos</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
           <div className="hidden md:flex flex-col text-right mr-4">
              <span className="text-xs text-slate-400">Proyecto</span>
              <span className="text-sm font-semibold text-white">{config.projectName}</span>
           </div>
           
           <button 
             onClick={() => setShowTemplates(!showTemplates)}
             className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700 flex items-center gap-2"
           >
             <LayoutTemplate className="w-4 h-4" />
             <span className="hidden sm:inline">Templates</span>
           </button>

           <button 
             onClick={handleExport}
             disabled={isExporting}
             className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
           >
             {isExporting ? (
               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
             ) : (
               <Download className="w-4 h-4" />
             )}
             <span>{isExporting ? 'Generando...' : 'Exportar ZIP'}</span>
           </button>
        </div>
      </header>

      {/* Templates Modal/Overlay */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowTemplates(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-4xl w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Selecciona un Template
              </h2>
              <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATES.map(template => (
                <div 
                  key={template.id} 
                  onClick={() => applyTemplate(template.id)}
                  className="bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-500/50 p-4 rounded-lg cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white group-hover:text-cyan-400">{template.name}</h3>
                    <div className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">Preset</div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(template.config).filter(Boolean).slice(0, 4).map((tool, i) => (
                      <span key={i} className="text-[10px] bg-slate-900 text-slate-300 px-2 py-1 rounded uppercase tracking-wide">
                        {TOOLS.find(t => t.id === tool)?.name || tool}
                      </span>
                    ))}
                    {Object.values(template.config).filter(Boolean).length > 4 && (
                      <span className="text-[10px] text-slate-500 px-1 py-1">+ más</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar / Wizard Steps */}
        <aside className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto shrink-0">
          <div className="p-4 md:p-6 space-y-2">
            <h2 className="hidden md:block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Configuración</h2>
            
            {/* General Settings Input */}
            <div className="mb-6 hidden md:block">
              <label className="text-xs text-slate-400 mb-1 block">Nombre del Proyecto</label>
              <input 
                type="text" 
                value={config.projectName}
                onChange={(e) => setConfig({...config, projectName: e.target.value})}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-600"
                placeholder="mi-proyecto-datos"
              />
            </div>

            <nav className="space-y-1">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isSelected = config.tools[cat.id] !== null;
                const isActive = activeStep === idx;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-slate-800 text-white shadow-md border border-slate-700' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`}
                  >
                    <div className={`relative ${isSelected ? 'text-cyan-400' : ''}`}>
                      <Icon className="w-5 h-5" />
                      {isSelected && <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full shadow-sm shadow-cyan-900"></div>}
                    </div>
                    <span className="hidden md:block text-sm font-medium">{cat.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto hidden md:block text-slate-600" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Selection Area */}
        <section className="flex-1 flex flex-col min-w-0 bg-slate-950 relative">
          
          <div className="p-6 md:p-10 overflow-y-auto h-full scroll-smooth">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  {currentCategory?.icon && React.createElement(currentCategory.icon, { className: "w-6 h-6 text-cyan-500" })}
                  {currentCategory?.label}
                </h2>
                <p className="text-slate-400">Seleccione las herramientas para esta etapa del pipeline.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTools.map(tool => {
                  const isSelected = config.tools[tool.category] === tool.id;
                  
                  return (
                    <div 
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.category, tool.id)}
                      className={`cursor-pointer group relative p-5 rounded-xl border transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-900/20 border-blue-500 shadow-xl shadow-blue-900/10 scale-[1.02]' 
                          : 'bg-slate-900 border-slate-800 hover:border-slate-600 hover:bg-slate-800 hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                         <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700'}`}>
                            {/* Dynamic Icon Rendering */}
                            {React.createElement(
                                TOOLS.find(t => t.id === tool.id)?.icon === 'Settings' ? Code : // Fallback
                                CATEGORIES.find(c => c.id === tool.category)?.icon || Box, 
                                { className: "w-6 h-6" }
                            )}
                         </div>
                         {isSelected && <div className="bg-blue-500 rounded-full p-1 shadow-sm"><Check className="w-3 h-3 text-white" /></div>}
                      </div>
                      <h3 className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-200'}`}>{tool.name}</h3>
                      <p className="text-sm text-slate-500 leading-snug">{tool.description}</p>
                    </div>
                  );
                })}
              </div>

              {currentTools.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-xl bg-slate-900/50">
                   <Box className="w-12 h-12 text-slate-700 mb-4" />
                   <p className="text-slate-500 font-medium">No se requiere selección para esta categoría en este demo.</p>
                   <p className="text-xs text-slate-600 mt-1">Puede continuar al siguiente paso.</p>
                 </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Preview Panel */}
        <aside className="hidden xl:flex w-96 bg-slate-900 border-l border-slate-800 flex-col shrink-0 transition-all duration-300">
           <div className="flex border-b border-slate-800">
             <button 
                onClick={() => setActiveTab('arch')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'arch' ? 'border-cyan-500 text-white bg-slate-800' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
               Arquitectura
             </button>
             <button 
                onClick={() => setActiveTab('files')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'files' ? 'border-cyan-500 text-white bg-slate-800' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
               Archivos
             </button>
             <button 
                onClick={() => setActiveTab('setup')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'setup' ? 'border-cyan-500 text-white bg-slate-800' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
             >
               Setup
             </button>
           </div>
           
           <div className="flex-1 p-4 overflow-hidden relative">
              {activeTab === 'files' && (
                <FileExplorer structure={generateFileStructure(config)} />
              )}
              {activeTab === 'arch' && (
                <ArchitecturePreview config={config} />
              )}
              {activeTab === 'setup' && (
                <ProjectSetup config={config} />
              )}
           </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
