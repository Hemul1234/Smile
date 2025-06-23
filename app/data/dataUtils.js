import { services } from '../data/servicesListData';
import { doctors } from '../data/doctorsData';
import slugify from 'slugify';

const datasets = {
  services,
  doctors,
};

export function filterDoctorsByCategory(doctors, category) {
  return doctors.filter(doc => doc.category === category);
}


export const getDataByTypeAndCategory = (type, category) => {
    const list = datasets[type];

    if (!list) {
        console.warn(`Нет данных для типа "${type}"`);
        return [];
    };

    const categoryKey = 'category';

    const dataWithSlugs = list.map(item => {

        const sourceString = type ==='services' ? item.text : item.name;

        return {
            ...item,
            slug: slugify(sourceString, { lower: true, strict: true, locale: 'ru' }),
        };
    });

    if (!category) return dataWithSlugs;
    
    return dataWithSlugs.filter(item => item[categoryKey] === category);
};


export const extractServiceData = (slug, type = 'services') => {
  const list = getDataByTypeAndCategory(type);

  const service = list.find((item) => item.slug === slug);
  const result = {};

  if (!service) return result;

  if (service.cost !== undefined) {
    result.cost = service.cost;
  }

  if (service.category !== undefined) {
    result.category = service.category;
  }

  if (service.article?.title) {
    result.title = service.article.title;
  }

  if (Array.isArray(service.article?.content)) {
    result.content = service.article.content;
  }
  
  return result;
};

export const findItemBySlug = (slug) => {
  for (const type in datasets) {
    const items = datasets[type];

    for (const item of items) {
      const sourceString = type === 'services' ? item.text : item.name;

      const generatedSlug = slugify(sourceString, {
        lower: true,
        strict: true,
        locale: 'ru',
      });

      if (generatedSlug === slug) {
        return {
          type,
          item,
          name: sourceString,
        };
      }
    }
  }

  return null;
};