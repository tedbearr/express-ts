interface insertInterface {
  code: string;
  name: string;
  value: string;
  description: string;
  status_id: number;
}

interface updateInterface {
  code: string;
  updated_at: any;
}

interface allGlobalParameter {
  id: number;
  // code: string;
  // created_at: any;
  // updated_at: any;
}

export { insertInterface, updateInterface, allGlobalParameter };
