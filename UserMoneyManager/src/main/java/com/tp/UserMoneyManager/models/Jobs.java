package com.tp.UserMoneyManager.models;

public class Jobs {
    Integer jobId;
    String roleName;

    public Jobs(){

    }
    public Jobs(Integer jobId, String roleName) {
        this.jobId = jobId;
        this.roleName = roleName;
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
