import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personal-wallet-frontend';

onClickLinked()
{
  window.open("https://www.linkedin.com/in/yesrat-rahman-84743717a/");

}

onClickedGit()
{
  window.open("https://github.com/YesratRahman");

}
}

