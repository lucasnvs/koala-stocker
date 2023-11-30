<?php

function testAuth($role) {
    if($_SESSION["user"]["role"] == $role) {
        return true;
    }
    return false;
}