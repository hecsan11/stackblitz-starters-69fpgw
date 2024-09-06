# stackblitz-starters-69fpgw

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/hecsan11/stackblitz-starters-69fpgw)

# Documentation

In this assesment, the initial project supplied with Angular 17.2 and standalone components was used. First, I wanted to change the architecture from standalone components to modules components. It seems more practical and easier to me because I have been working from Angular´s first versions to Angular 17 with this architecture approach, even carrying out migrations to Angular 17 following this approach preventing to critically alter projects created wiht old Angular´s versions.

To do this I needed to use the @angular/platform-browser-dynamic module but since it was not installed in the project by default, I understood that you wanted this task to be done with standalone components. So we continued with this Angular´s programming paradigm.

Following this architecture, two files were created to implement Angular routing in the app with the files app.routes.ts and app.config.ts.

# App.routes.ts

```code
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // Lazy loading of standalone components
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent)
  }
  
];
```

Lazy loading of standalone components is implemented to load components only when they are accessed rather than from startup for easing the load. This is incredibly useful in larger, interconnected applications to reduce waiting and loading times.

# App.config.ts

```code
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

The router is configured with the routes that the application will use

# main.ts

```code
@Component({
  selector: 'app-root',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './app.component.html',
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, appConfig);
```

Angular Router module is imported into the standalone component. We separate the HTML template into another file to facilitate legibility even if it only has the router-outlet tag to execute the route redirections.

# app.component.html

```code
<div class="container">
  <router-outlet></router-outlet>
</div>
```

After creating the app´s initialization and the associated routing, we start creating the components in the components folder to separate the different components from the app-root.

At the beginning, we create the login and then the home or "Success" page. Component styles can be assigned specifically within each component with the following styleUrl statement: './login.component.scss' within the @Component.

```code
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
```

Because the project will not have many CSS classes, I chose to use style identifiers (example: #status) and change the file type from CSS to SCSS which allows to extend more easily the BEM (Block - Element - Modifier) pattern.

Now a brief explanation of the login component

# login.component.ts

```code
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  user: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  login() {
    const params = {
      method: 'POST',
      body: JSON.stringify({
        email: this.user.controls['email'].value,
        password: this.user.controls['password'].value,
      }),
    };
    this.router.navigate(['home']);
    // TODO: Mock call with a JSON Server or other tool
   
  }
```

We use Angular´s Reactive Forms so we have to do the following import "imports: [ReactiveFormsModule]". This import will allow us to use Angular's Reactive Forms in the HTML template and the requested validators. Reactively, one validator checks that the email is in the correct format and the other validator that the password has a minimum password size of 8 characters.

```code
user: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
```

The params variable is used to collect the values ​​and save them in a JSON. In case we have to make a call to the backend API, I add this comment for a posible integration solution:

```code
/* return fetch('path/to/api/login', params)
      .then(response => response.json())
      .then(session => {
        this.token = session.token;
        this.router.navigate(['home']);
 }); */
``` 

If the backend returns that the email and password credentials are correct and corresponds to a user, we would take the token with the user specific information and navigate to the next page ("home").

Due to the backend´s absence, the login only validates that the attributes entered by the user are not blank, the email is in email format and that the password has at least 8 characters as requested in the task.

# login.component.html

```code
<form [formGroup]="user">
  <div class="login">
    <label for="uname"><b>Email</b></label>
    <input
      type="text"
      placeholder="Enter email"
      name="name"
      formControlName="email"
      required
    />

    <label for="psw"><b>Password</b></label>
    <input
      type="password"
      placeholder="Enter Password"
      formControlName="password"
      name="password"
      required
    />

    <button [disabled]="user.invalid" (click)="login()">Login</button>
  </div>

</form>
```

The [formGroup]="user" attribute is used to set the reactive properties of the angular form to the <form> tag and enable/disable the button if the conditions are fulfilled/unfulfilled.

Finally, if the user has logged in correctly, it will redirect him to the "home". The home.component.ts is just a component´s instantiation with the HTML template that we are going to use. It is created in case that in the future we need more specific methods within the .ts and to follow the 
Angular´s project architecture. I will explain the embedding of the GIF in the HTML, which has been the most problematic thing to introduce both in Stackblitz and in the project itself.

```code
<div id="card">
  <div id="upper-side">
    <!-- <img
      src="../../assets/images/b01ddf257d18c8a9b41e0502161d580c.gif"
    /> -->
    <div class="gif"></div>
    <h3 id="status">Success!!!</h3>
  </div>
  <div id="lower-side">
    <p id="message">
      You have logged in successfully!
    </p>
  </div>
</div>
```

I tried to add the gif with the img tag because it is possible and to avoid using iframes or other elements that would difficult the load or could cause CORS errors. However, I couldn't load it until I entered the .gif through scss classes.

Introducing the gif was laborious because I had to connect stackblitz with my Github´s repository and add the images (in this case the .gif) to the assets/images folder. It also gave me some problems since I was not able to find it even though the route inside the project correctly redirected me to the image, so the SCSS approach was chosen.




