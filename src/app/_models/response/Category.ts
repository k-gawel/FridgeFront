import {KeyName} from './KeyName';
import {Entity} from './Entity';

export class Category extends Entity {

    public static rootCategory: Category;

    public id: number;
    public name: string;
    public parent: Category;
    public children: Category[];

    constructor(json?: JSON) {
        super();

      if(json == null)
        return;

      if(Category.rootCategory == null)
        Category.rootCategory = this;

      this.id = json['id'];
      this.name = json['name'];

      this.children = [];
      json['children'].forEach((c: JSON) => {
        let child: Category = new Category(c);
        child.parent = this;
        this.children.push(child);
      });
    }

    public isFinal(): boolean {
        return this.children == null || this.children.length == 0;
    }

    public addChild(child: KeyName) {
      if(this.isFinal())
          return;

      let categoryChild = new Category();
      categoryChild.id = child.id;
      categoryChild.name = child.name;
      categoryChild.parent = this;

      this.children.push(categoryChild);
    }

    public equals(category: Category): boolean {
      return category != null && category.id == this.id;
    }

    public getTrack(): Category[] {
      let result: Category[] = [];
      let category: Category = this;

      while(category != null) {
            result.unshift(category);
            category = category.parent;
        }

        return result;
    }

    public static getById(id: number): Category {

        return this.getByIdInChildren(id, Category.rootCategory);

    }

    private static getByIdInChildren(id: number, parent: Category): Category {
      let result = null;

      if(parent.id == id)
            return parent;
        if(parent.isFinal())
            return result;

        for(let i = 0; i < parent.children.length; i++ ) {
            if(parent.children[i].id == id) {
                result = parent.children[i];
                return result;
            } else {
                if(result == null)
                result = this.getByIdInChildren(id, parent.children[i]);
            }
        }

        return result;
    }

    getFinalCategories(): Category[] {
      let result: Category[] = [];

      if(this.isFinal())
        result.push(this);
      else {
        for(let category of this.children) {
          let categories = category.getFinalCategories();
          categories.forEach((c: Category) => result.push(c));
        }
      }

      return result;
    }

}
