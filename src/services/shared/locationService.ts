import colombiaData from '../../locales/shared/colombia.json';

interface ColombiaData {
    id: number;
    departamento: string;
    ciudades: string[];
}

const typedData = (colombiaData as ColombiaData[]).sort((a, b) => a.departamento.localeCompare(b.departamento));

export const locationService = {
    getDepartments: (): string[] => {
        return typedData.map(d => d.departamento);
    },
    getCitiesByDepartment: (departmentName: string): string[] => {
        const department = typedData.find(d => d.departamento === departmentName);
        return department ? department.ciudades.sort((a, b) => a.localeCompare(b)) : [];
    },
};