const $ = (window as any).$;

export interface Gritter {
  title?: string;
  text?: string;
  image?: string;
  class_name?: string;
  position?: string;
}

export function success(notification: Gritter | string) {
  const opt = {
    title: 'Réussi',
    class_name: 'color success'
  };
  $.extend(opt, typeof notification === 'string' ? { text: notification } : notification);
  $.gritter.add(opt);
}

export function error(notification: Gritter | string) {
  const opt = {
    title: 'Erreur',
    class_name: 'color danger'
  };
  $.extend(opt, typeof notification === 'string' ? { text: notification } : notification);
  $.gritter.add(opt);
}

export function info(notification: Gritter | string) {
  const opt = {
    title: 'Info',
    class_name: 'color primary'
  };
  $.extend(opt, typeof notification === 'string' ? { text: notification } : notification);
  $.gritter.add(opt);
}
