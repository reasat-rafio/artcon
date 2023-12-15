import { FaFileExport } from 'react-icons/fa6';
import ExportComponent from '@/studio/components/export/ExportComponent';
import type { Tool } from 'sanity';

const exportTool = (): Tool => {
  return {
    title: 'Export',
    name: 'export',
    icon: FaFileExport,
    component: ExportComponent,
  };
};

export default exportTool;
