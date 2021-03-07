import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onClickLinked()
  {
    window.open("https://www.linkedin.com/in/yesrat-rahman-84743717a/");
  
  }
  
  onClickedGit()
  {
    window.open("https://github.com/YesratRahman");
  
  }
  onClickedGitLab()
  {
    window.open("https://gitlab.com/yr2818");
  
  }
}
